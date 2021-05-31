const { comments } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { comments } = req.body;

    comments
      .create({
        id: users_id,
        comments: comments,
      })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(500).send('err');
      });
  },
};
