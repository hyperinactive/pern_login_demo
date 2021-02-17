module.exports = async (req, res, next) => {
  const { email, name, password } = req.body;

  const validEmail = (userEmail) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);

  if (req.path === '/register') {
    if (![email, name, password].every(Boolean)) {
      return res.status(403).json({ message: 'Missing credentials' });
    }
    if (!validEmail(email)) {
      return res.status(403).json({ message: 'Invalid Email' });
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.status(403).json({ message: 'Missing credentials' });
    }
    if (!validEmail(email)) {
      return res.status(403).json({ message: 'Invalid Email' });
    }
  }

  next();
};
