const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errorHandler = require('./../utils/errorHandler');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if(user.length >= 1) {
        return res.sendStatus(409);
      } else {
        bcryptjs.genSalt(10, (err, salt)  => {
          bcryptjs.hash(req.body.password, salt, (err, hash) => {
            if(err) {
            next(err)
          } else {
            const user = new User({
              email: req.body.email,
              password: hash
            });

            user.save()
              .then(result => {
                return res.sendStatus(201);
              })
              .catch(err => next(err))
          }
          })
        })
        /*bcrypt.hash(req.body.pass, 10, (err, hash) => {
          if(err) {
            next(err)
          } else {
            const user = new User({
              email: req.body.email,
              password: hash
            });

            user.save()
              .then(result => {
                return res.sendStatus(201);
              })
              .catch(err => next(err))
          }
        })*/
      }
    })
    .catch(err => next(err))
  

});

router.delete('/:id', (req, res, next) => {
  const userId = req.params.id;
  
  User.remove({ _id: userId })
    .exec()
    .then(result =>{ 
      return res.sendStatus(200)
    })
    .catch(err => {
      next(err)
    })
});

router.get('/signup', (req, res, next) => {

});

router.post('/login', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if(user.length < 1) {
        return res.status(401).send({
          message: 'Auth Failed'
        });
      }
      
      bcryptjs.compare(req.body.password, user[0].password, (err, result) => {
        // res === true
        if (err) {
          return res.status(401).send({
            message: 'Auth Failed'
          });
        }
        
        if(result) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id
          }, 
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1h'
          }); 
          
          return res.status(200).send({
            message: 'OK',
            token: token
          })
        }
        
        return res.status(401).send({
          message: 'Auth Failed'
        });
      });
    
      /*bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).send({
            message: 'Auth Failed'
          });
        }
        
        if(result) {
          return res.status(200).send({
            message: 'OK'
          })
        }
        
        return res.status(401).send({
          message: 'Auth Failed'
        });
      })*/
    })
    .catch(err => next(err))
});

router.get('/signin', (req, res, next) => {

});

module.exports = router;