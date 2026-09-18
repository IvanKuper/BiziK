const hits = new Map();

const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 20 } = {}) => {
  return (req, res, next) => {
    const key = `${req.ip}:${req.originalUrl}`;
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((time) => now - time < windowMs);
    if (recent.length >= max) {
      return res.status(429).send("Too many attempts. Please try again later.");
    }
    recent.push(now);
    hits.set(key, recent);
    next();
  };
};

module.exports = rateLimit;
