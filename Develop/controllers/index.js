const router = require('express').Router();
const express = require('express')

const app = express();
app.use(express.json());

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

app.use(router);

module.exports = router;