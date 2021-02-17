/* eslint-disable max-len */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../db/db');
const validate = require('../middleware/validateInfo');
const authorization = require('../middleware/authorization');
const tokenGenerator = require('../utils/token');

router.post('/register', validate, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await db.query('select * from users where user_email = $1;', [email]);

    // user already exists
    if (user.rows.length !== 0) {
      return res.status(401).json({ message: 'User already exists' });
    }

    // hash the pass
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'insert into users (user_name, user_email, user_password) values ($1, $2, $3) returning *',
      [name, email, passwordHash],
    );

    return res.status(201).json({ data: newUser.rows[0].user_email, message: 'Resource created successfully' });
  } catch (error) {
    res.status(500).json({ err: error, message: 'smth broke' });
  }
});

router.post('/login', validate, async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query('select * from users where user_email = $1', [email]);

  // in case of invalid logins
  if (user.rows.length === 0) {
    return res.status(401).json({ message: 'Password or email is incorrect' });
  }

  const validPassword = bcrypt.compare(password, user.rows[0].user_password);

  if (!validPassword) {
    return res.status(401).json({ message: 'Password is incorrect' });
  }
  const token = tokenGenerator(user.rows[0].user_id);

  return res.status(200).json({ message: 'Auth looks good', data: token });
});

// kind of dumb, but w/e
// pretty sure about it
router.get('/verify', authorization, async (req, res) => {
  try {
    return res.status(200).json({ isAuthenticated: true });
  } catch (error) {
    res.status(500).json({ err: error, message: 'smth broke' });
  }
});

module.exports = router;
