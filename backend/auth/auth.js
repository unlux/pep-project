const checkUsername = (req, res, next) => {
  const username = req.headers["username"];
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  next();
};

module.exports = checkUsername;
