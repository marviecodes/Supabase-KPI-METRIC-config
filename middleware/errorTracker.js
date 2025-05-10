let totalRequests = 0;
let errorCount = 0;

function errorTracker(req, res, next) {
  totalRequests++;

  res.on("finish", () => {
    if (res.statusCode >= 500) {
      errorCount++;
    }

    console.log(
      `Error rate: ${((errorCount / totalRequests) * 100).toFixed(2)}%`
    );
    // Optionally, push this to Supabase regularly
  });

  next();
}

module.exports = errorTracker;
