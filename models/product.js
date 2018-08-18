var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var productSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  imagePath: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

productSchema.static('findBySlug', (slug, callback) => {
  return this.find({ slug: slug }, callback);
})


productSchema.plugin(URLSlugs('title'));

module.exports = mongoose.model('Product', productSchema);