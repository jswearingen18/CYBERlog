const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const userData = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password
  });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.fullName = userData.fullName;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const userPassword = await userData.validatePassword(req.body.password);

    if (!userPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: `You are now logged in!` });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;