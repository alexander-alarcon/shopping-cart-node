const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const logger = require('morgan');
const mongoose = require('mongoose');
const morgan = require('morgan');

const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
 
const errorHandler = require('./utils/errorHandler');

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`, {
  useNewUrlParser: true
});

const winstonLogger = require('./config/logger.js'); 

const app = express();
 
app.use(morgan('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.message = 'Not Found!';/*
  next(error);*/
  const aux = errorHandler(error);
  winstonLogger.log("error", {
    url: req.originalUrl,
    method: req.method,
    error: error
  });
  res.status(aux.status)
  res.json({
    error: {
      message: aux.message
    }
  })
  res.end();
});

app.use((error, req, res, next) => {
  winstonLogger.log("error", {
    url: req.originalUrl,
    method: req.method,
    error: error
  });
  
  const aux = errorHandler(error);
  res.status(aux.status);
  res.json({
    error:{
      message: aux.message
    }
  })
});

module.exports = app;
