const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
// 
const shopRoutes = require("./routes/shopRoutes");

const productRoutes = require("./routes/productRoutes");

const purchaseRoutes = require("./routes/purchaseRoutes");
const salesRoutes = require("./routes/salesRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products",productRoutes);
app.use("/api/purchase",purchaseRoutes);
app.use("/api/sales",salesRoutes);
app.use("/api/inventory",inventoryRoutes);
app.use("/api/dashboard",dashboardRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Inventory API running...");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});