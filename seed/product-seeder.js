var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect(`mongodb://admin:123456a@ds018568.mlab.com:18568/shopping`, {
  useNewUrlParser: true
});

var products = [
  new Product({
    imagePath: "http://2.bp.blogspot.com/-1q4fAgyIV9Y/UaJuCtnD3RI/AAAAAAAAC2s/WORdfZUUisY/s640/Prince+of+Persia+Revelations+Free+PSP+Game+cover.jpg",
    title: "Prince of Persia Revelations",
    description: "Prince of Persia: Revelations is a third-person action-adventure puzzle game developed by Pipeworks and published by Ubisoft. ontent.",
    price: 19.99
  }),
  new Product({
    imagePath: "https://ugc.kn3.net/i/origin/http://1.bp.blogspot.com/_tUC1aiyziF4/S4wsdyATXAI/AAAAAAAAAFI/yEUVCmoZHTA/s640/dantes_inferno_uk_boxart_psp.jpg",
    title: "Dante's Inferno",
    description: "Dante's Inferno is a 2010 action video game developed by Visceral Games and published by Electronic Arts.",
    price: 28.98
  }),
  new Product({
    imagePath: "https://2.bp.blogspot.com/-hcPnCOExFQQ/WxvjDlH7iKI/AAAAAAAAB58/fhD2EC4rqfgbgLt8v2UISFdyf9wsagE8ACEwYBhgL/s640/Jak-daxter-lost-frontier-psp-cover-art.jpg",
    title: "Jak and Daxter : The Lost Frontier",
    description: "Jak and Daxter: The Lost Frontier is a platform game developed by High Impact Games and published by Sony Computer Entertainment.",
    price: 28.89
  }),
  new Product({
    imagePath: "https://www.retroplace.com/pics/psp/packshots/101174--crisis-core-final-fantasy-vii.png.pagespeed.ce.GpaCf5iFTv.png",
    title: "Crisis Core: Final Fantasy VII",
    description: "Crisis Core: Final Fantasy VII is an action role-playing game developed and published by Square Enix for the PlayStation Portable. ",
    price: 29.49
  }),
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(error, result) {
    done++
    if (done === products.length) {
      exit()
    } 
  });
}

function exit() {
  mongoose.disconnect();
}