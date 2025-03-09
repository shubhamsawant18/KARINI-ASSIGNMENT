const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');
const cors = require('cors');
dotenv.config();
const app = express();
const userRoutes = require('./routes/usersRouter');
const routes = require('./routes/index');

app.use(cors());

connectDb();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Routes
app.use("/api", routes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
