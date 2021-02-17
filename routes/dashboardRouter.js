const app = require('../app');

const router = require('express').Router();
const db = require('../db/db');

const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  try {
    const user = await db.query('select user_name from users where user_id = $1', [res.locals.user]);

    res.status(200).json({ data: user.rows[0] });
  } catch (error) {
    return res.status(500).json({ err: error, message: 'smth broke' });
  }
});
module.exports = router;
