const express = require('express');
const dotenv = require('dotenv');


const connectDB = require('./db');

// Load env
dotenv.config({ path: './config.env' });

const app = express();
connectDB();

// Routes
app.use('/test', require('./routes/test')); 










// Init port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});




