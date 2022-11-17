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

module.exports = router;
