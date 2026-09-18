module.exports = (req, res, next) => {
  if (!req.payload?.biz) {
    return res.status(403).send("This action is for business accounts only");
  }
  next();
};
