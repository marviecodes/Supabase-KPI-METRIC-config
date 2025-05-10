const responseTimer = (req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const responseTimeMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

    console.log(`[${req.method}] ${req.originalUrl} - ${responseTimeMs}ms`);
    // Optionally store this in Supabase for tracking
  });

  next();
};

module.exports = responseTimer;
