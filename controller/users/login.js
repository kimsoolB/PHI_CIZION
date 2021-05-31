require('dotenv').config();

const http = require('http');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { request } = require('../session-practice/db');

const app = express();
const server = http.createServer(app);
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//seed data
const users = [{ email: 'test@cizion.com', password: 'secret' }];

// 로그인 email, password 확인
const login = (email, password) => {
  let len = users.length;

  for (let i = 0; i < len; i++) {
    if (email === users[i].email && password === users[i].password) return email;
  }

  return '';
};

//access token
const generateAccessToken = (email) => {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

//refersh token
const generateRefreshToken = (email) => {
  return jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '180 days',
  });
};

//각각 access token, refresh token 발급
app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = login(email, password);
  if (user === '') return res.sendStatus(500);

  let accessToken = generateAccessToken(user);
  let refreshToken = generateRefreshToken(user);

  res.json({ accessToken, refreshToken });
});

// access token의 유효성 검사
const authenticateAccessToken = (req, res, next) => {
  let authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('wrong token format or token is not sended');
    return res.sendStatus(400);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      console.log(error);
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

// access token을 refresh token 기반으로 재발급
app.post('/refresh', (req, res) => {
  let refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);

    const accessToken = generateAccessToken(user.email);

    res.json({ accessToken });
  });
});

// access token 유효성 확인을 위한 예시 요청
app.get('/user', authenticateAccessToken, (req, res) => {
  console.log(req.user);
  res.json(users.filter((user) => user.email === req.user.email));
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
