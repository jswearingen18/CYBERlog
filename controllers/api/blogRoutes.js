const router = require('express').Router();
const { Blogs, User } = require('../../models');
const verifyUser = require('../../utils/auth');

router.post('/', verifyUser, async (req, res) => {
  try {
    const newBlog = await Blogs.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const blogUpdates = await Blogs.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(blogUpdates);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', verifyUser, async (req, res) => {
  try {
    const blogsData = await Blogs.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogsData) {
      res.status(404).json({ message: 'No blogs were found with that id!' });
      return;
    }

    res.status(200).json(blogsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
