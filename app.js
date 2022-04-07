const express = require("express");
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require("./config/db");

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./Router/userRoutes');
const sectionRouter = require('./Router/sectionRoutes');
const prodAutoRouter = require('./Router/prodAutoRoutes');
const prodHouseRouter = require('./Router/prodHouseroutes');

const cookiesMiddleware = require('universal-cookie-express');

require("dotenv").config()



const app = express();



// app.enable('trust proxy');

connectDB();

// Allow cors everywhere
app.use(cors({ origin: true, credentials: true }))

app.options('*', cors());


// Set security HTTP headers
app.use(helmet());

//Limit Data Body
app.use(
    express.json({
        limit: "10kb"
    })
);


// set cookies
app.use(cookiesMiddleware());
// app.use(cookieParser());

//access

// app.all("*", (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//     res.setHeader('Access-Control-Allow-Headers', '*'
//     )
//     next();
// });


// Routes  

app.use('/api/v1/users', userRouter);
app.use('/api/v1/sections', sectionRouter);
app.use('/api/v1/vehicles', prodAutoRouter);
app.use('/api/v1/realestate', prodHouseRouter);






// error to no exist routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


// Error midleware 
app.use(globalErrorHandler);

module.exports = app;