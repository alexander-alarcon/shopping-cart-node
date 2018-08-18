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
  new Product({
    imagePath: "https://en.wikipedia.org/wiki/God_of_War:_Chains_of_Olympus#/media/File:God_of_War_Chains_of_Olympus_NA_version_front_cover.jpg",
    title: "God of War: Chains of Olympus",
    description: "God of War: Chains of Olympus is a third-person action-adventure video game developed by Ready at Dawn and Santa Monica Studio, and published by Sony Computer Entertainment (SCE).",
    price: 35
  }),
  new Product({
    imagePath: "https://upload.wikimedia.org/wikipedia/en/9/9a/Kingdom_Hearts_Birth_by_Sleep_Boxart.jpg",
    title: "Kingdom Hearts Birth by Sleep",
    description: "Kingdom Hearts Birth by Sleep is an action role-playing video game developed and published by Square Enix for the PlayStation Portable, serving as the sixth installment in the Kingdom Hearts series.",
    price: 35,
  })
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