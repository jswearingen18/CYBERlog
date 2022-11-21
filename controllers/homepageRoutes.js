const router = require('express').Router();
const { Blogs, User } = require('../models');
const verifyUser = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blogs.findAll({
      include: [
        {
          model: User,
          attributes: ['fullName'],
        },
      ],
      order: [['date_created', 'DESC']],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogsData = await Blogs.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['fullName'],
        },
      ],
    });

    const blog = blogsData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', verifyUser, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Blogs,
          attributes: ['blogs'],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/createAccount', (req, res) => {
  res.render('createAccount');
});

module.exports = router;
