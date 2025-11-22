const express = require("express");
const app = express();
const sequelize = require("./config/database");
require("dotenv").config();

app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Kết nối DB
sequelize.authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB error", err));

// Routes
app.use("/api/like", require("./routes/likeRoutes"));
app.use("/api/rate", require("./routes/rateRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
