let products = [{
  on_sale: true,
  name: 'Banana',
  quantity: 14,
  price: 0.79
}, {
  name: 'Apple',
  quantity: 3,
  price: 0.55
}];

let productsTemplate = Handlebars.compile($('#productTemplate').html());
let $list = $('ul');

let productsHtml = products.map(function(product) {
  return productsTemplate(product);
});

$list.html(productsHtml.join(''));