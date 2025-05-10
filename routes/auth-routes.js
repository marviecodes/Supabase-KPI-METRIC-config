const express = require("express");
const router = express.Router();
const trackEvent = require("../utils/trackEvent");
const logApiMetrics = require("../utils/logApiMetrics");

router.post("/register", async (req, res) => {
  const start = Date.now(); // Start time to measure response time
  let retries = 0;
  const maxRetries = 3;
  let errorOccurred = false;
  let statusCode = 200; // Success by default
  try {
    // perform logic
    // Log event to Supabase
    await trackEvent({
      event_name: "user_signed_up",
      user_id: "test",
      metadata: { source: req.headers.referer || "direct" },
    });
    res.status(200).json({ data: req.body });
  } catch (error) {
    errorOccurred = true;
    statusCode = 500;
    console.log(error);
    res.status(statusCode).json({ msg: "Something went wrong" });
  } finally {
    const responseTimeMs = Date.now() - start;

    // Log API metrics
    await logApiMetrics({
      endpoint: "/register",
      responseTimeMs,
      statusCode,
      error: errorOccurred,
      retryAttempts: retries,
    });
  }
});

router.post("/upload", async (req, res) => {
  try {
    // Log event to Supabase
    await trackEvent({
      event_name: "asset_uploaded",
      user_id: "testID",
      metadata: { source: req.headers.referer || "direct" },
    });
    res.status(200).json({ success: true, msg: "Asset uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
