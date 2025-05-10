const supabase = require("../lib/supabase");

async function trackEvent({ event_name, user_id, metadata = {} }) {
  const { error } = await supabase
    .from("event_logs")
    .insert([{ event_name, user_id, timestamp: new Date(), metadata }]);

  if (error) {
    console.log("Event logging failed:", error);
  }
}

module.exports = trackEvent;
