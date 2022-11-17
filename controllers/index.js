const router = require('express').Router();
const express = require('express')

const app = express();
app.use(express.json());

const apiRoutes = require('./api');
const homepageRoutes = require('./homepageRoutes');

router.use('/', homepageRoutes);
router.use('/api', apiRoutes);

app.use(router);

module.exports = router;