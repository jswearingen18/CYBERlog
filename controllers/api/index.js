const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogsRoutes = require('./blogRoutes');

router.use('/users', userRoutes);
router.use('/blogs', blogsRoutes);

module.exports = router;