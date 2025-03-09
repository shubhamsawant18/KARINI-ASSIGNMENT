const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const Product = require("./models/itemModel.js"); 

dotenv.config(); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION);
    console.log("🔥 Database Connected Successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// **Load Data from JSON file**
const importData = async () => {
  try {
    await connectDB(); // Connect to DB

    const jsonData = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    await Product.insertMany(jsonData); 

    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Data Import Failed:", error);
    process.exit(1);
  }
};

importData();
