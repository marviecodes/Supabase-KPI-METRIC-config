const express = require("express");
const router = express.Router();
const trackEvent = require("../utils/trackEvent");
const logApiMetrics = require("../utils/logApiMetrics");
const asyncHandler = require("express-async-handler");

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const start = Date.now();

    // Your logic here
    await trackEvent({
      event_name: "user_signed_up",
      user_id: "test",
      metadata: { source: req.headers.referer || "direct" },
    });

    res.status(200).json({ data: req.body });

    const responseTimeMs = Date.now() - start;

    await logApiMetrics({
      endpoint: "/register",
      responseTimeMs,
      statusCode: 200,
      error: false,
      retryAttempts: 0,
    });
  })
);

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
