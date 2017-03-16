'use strict';

var braintree = require('braintree');
var environment, gateway, getToken;

/**
 * Instantiate your gateway (update here with your Braintree API Keys)
 */
environment = process.env.BT_ENVIRONMENT.charAt(0).toUpperCase() + process.env.BT_ENVIRONMENT.slice(1);
gateway = braintree.connect({
  environment:  braintree.Environment[environment],
  merchantId:   process.env.BT_MERCHANT_ID,
  publicKey:    process.env.BT_PUBLIC_KEY,
  privateKey:   process.env.BT_PRIVATE_KEY
});

getToken=function(req,res){
    gateway.clientToken.generate({}, function (err, res) {
      if (err) throw err;
      res.json({
        "client_token": res.clientToken
      });
	  });
}

module.exports.sellAmount = function (request, response) {
  var transaction = request.body;
  gateway.transaction.sale({
    amount: transaction.amount,
    paymentMethodNonce: transaction.payment_method_nonce
  }
module.exports = gateway;
module.exports = getToken;
