const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

const upload = multer({
  storage: storage,
  limits: {
    // 5MB
    fileSize: 1024 * 1024 * 5,
    fieldNameSize: 1024
  },
  fileFilter: fileFilter
});

const errorHandler = require('./../utils/errorHandler');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product.find()
    .select('-__v')
    .exec()
    .then(products => {
      const response = {
        data : products.map(product => {
          const { _id, ...rest } = product._doc
          return {
            id: _id,
            type: 'products',
            links: {
              self: `${req.protocol}://${req.get('host')}${req.originalUrl}/${product._doc.slug}`
            },
            attributes: {
              ...rest
            }
          }
        }),
        meta: {
          count: products.length
        } 
      }
      res.status(200).send(response);
    })
    .catch(err => {
      next(err)
    });
});

/*router.get('/:id', (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId)
    .select('-__v')
    .exec()
    .then(product => {
      if(!product) {
        next()
      } else {
        res.status(200).send(product);
      }
    })
    .catch(err => {
      next(err)
    })
});*/

router.get('/:slug', (req, res, next) => {
  const slug = req.params.slug;
  Product.findBySlug(slug, (err, product) => {
    if(err) {
      return next(err)
    }
    
    if(!product) {
      return next()
    }
    const { _id, ...rest } = product._doc;
    return res.status(200).json({
      id: _id,
      type: 'products',
      links: {
        self: `${req.protocol}://${req.get('host')}${req.originalUrl}/${product._doc.slug}`
      },
      attributes: {
        ...rest
      }
    });
  })
})

router.patch('/:id', checkAuth, (req, res, next) => {
  const productId = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  console.log(updateOps, req.body)
  Product.update({ _id: productId }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      next(err)  
    })
});

router.delete('/:id', checkAuth, (req, res, next) => {
  const productId = req.params.id;
  
  Product.remove({ _id: productId})
    .exec()
    .then(result =>{ 
      return res.sendStatus(200)
    })
    .catch(err => {
      next(err)
    })
});

router.post('/', checkAuth, upload.single('productImg'), (req, res, next) => {
  const newProduct = new Product({
    ...req.body,
    imagePath: req.file.path
  });
  newProduct.save()
    .then(product => {
      return res.sendStatus(201);
    })
    .catch(err => {
      next(err)
    })
});

module.exports = router;