var express = require('express');
var router = express.Router();

var errorHandler = require('./../utils/errorHandler');
const checkAuth = require('../middleware/check-auth');

var Product = require('../models/product');
var Order = require('../models/order');

router.get('/', checkAuth, (req, res, next) => {
  Order.find()
    .select('-__v')
    .populate('product', '-__v')
    .exec()
    .then(orders => {
      const response = {
        data: orders.map(order => {
          const { _id, ...rest } = order._doc;
          return {
            id: _id,
            type: 'orders',
            links: {
              self: `${req.protocol}://${req.get('host')}${req.originalUrl}/${_id}`
            },
            attributes: {
              ...rest
            }
          }
        }),
        meta: {
          count: orders.length
        }
      }
      res.status(200).send(response);
    })
    .catch(err => next(err));
});

router.get('/:id', checkAuth, (req, res, next) => {
  const orderId = req.params.id;
  Order.findById(orderId)
    .select('-__v')
    .populate('product', '-__v')  
    .exec()
    .then(order => {
      if(!order) {
        next()
      }
      const { _id, ...rest } = order._doc;
      return res.status(200).json({
        id: _id,
        type: 'orders',
        links: {
          self: `${req.protocol}://${req.get('host')}${req.originalUrl}/${_id}`
        },
        attributes: {
          ...rest
        }
      });
    })
    .catch(err => {
      next(err)
    })
});

router.post('/', checkAuth, (req, res, next) => {
  Product.findById(req.body.product)
    .then(product => {
      if(!product) {
        return next()
      } 
        const newOrder = Order(req.body);
        newOrder.save()
        .then(order => {
          return res.sendStatus(201);
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
  
});

router.delete('/:id', checkAuth, (req, res, next) => {
  const orderId = req.params.id;
  
  Order.remove({ _id: orderId})
    .exec()
    .then(result =>{ 
      return res.sendStatus(200)
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router;