const supabase = require("../lib/supabase");

async function logApiMetrics({
  endpoint,
  responseTimeMs,
  statusCode,
  error,
  retryAttempts = 0,
}) {
  const { error: supabaseError } = await supabase.from("api_metrics").insert([
    {
      endpoint,
      response_time_ms: responseTimeMs,
      status_code: statusCode,
      error,
      retry_attempts: retryAttempts,
    },
  ]);

  if (supabaseError) {
    console.error("Failed to log API metrics:", supabaseError.message);
  }
}

module.exports = logApiMetrics;
