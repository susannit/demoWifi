'use strict';

var braintree = require('braintree');
var environment, gateway;

/**
 * Instantiate your gateway (update here with your Braintree API Keys)
 */
var environment = process.env.BT_ENVIRONMENT.charAt(0).toUpperCase() + process.env.BT_ENVIRONMENT.slice(1);
var gateway = braintree.connect({
  environment:  braintree.Environment[environment],
  merchantId:   process.env.BT_MERCHANT_ID,
  publicKey:    process.env.BT_PUBLIC_KEY,
  privateKey:   process.env.BT_PRIVATE_KEY
});

module.exports = gateway;
