'use strict';
module.exports=function(payment_collection){
  var payInfoApi={};
 payInfoApi.savePaymentResponse=function(paymentInfoObj,cb){
		 paymentInfoObj['createDate'] = new Date();
		 payment_collection.insertOne(paymentInfoObj, function(err, doc) {  
			if (err){
				return cb(err);
			}
			 cb(null,true)
		});
		};	
	return payInfoApi;
}
