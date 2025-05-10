require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const authRoutes = require("./routes/auth-routes");
const responseTimer = require("./middleware/responseTimer");
const errorTracker = require("./middleware/errorTracker");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(responseTimer);
app.use(errorTracker);
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
