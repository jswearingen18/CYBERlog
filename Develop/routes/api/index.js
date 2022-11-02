const router = require("express").Router();
const userRoutes = require("./user-routes");
const blogsRoutes = require("./blogs-routes");

router.use("/user", userRoutes);
router.use("/blogs", blogsRoutes);

module.exports = router;
