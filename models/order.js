var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  /*user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cart: {
    type: Object,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  }*/
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});


/* *****
** user.id,
** TotalQuantity
** TotalPrice
** products []
**
***** */



module.exports = mongoose.model('Order', orderSchema);