const { comments } = require('../../models');

module.exports = {
  put: (req, res) => {
    const { comments } = req.body;
    const id = req.comments_id;

    comments
      .update({
        where: {
          id: comments_id,
        },
      })
      .then((data) => {
        res.status(200).send('댓글이 삭제되었습니다.');
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
