var stripe = Stripe('pk_test_am12qqFfMmgE2ZeyTRNcagCY');

var elements = stripe.elements();

var form = document.getElementById('checkout-form');

function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);
 
  // Submit the form
  form.submit();
}

var style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

form.addEventListener('submit', function(event) {
  event.preventDefault();

  var name = form.querySelector('input[name="name"]');
  var address1 = form.querySelector('input[name="address"]');
  var additionalData = {
    name: name.value || undefined,
    address_line1: address1.value || undefined,
  };
  
  stripe.createToken(card, additionalData).then(function(result) {
    console.log(card, 'card')
    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});