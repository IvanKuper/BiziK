module.exports = (req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startedAt;
    console.log(
      `METHOD:${req.method} | URL:${req.originalUrl} | STATUS:${res.statusCode} | ${duration}ms`
    );
  });

  next();
};
