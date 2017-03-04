'use strict';
module.exports=function(user_collection){
  var userInfoApi={};
 userInfoApi.createUser=function(userObj,cb){
		 var newContact = userObj;
		 newContact['createDate'] = new Date();
		 user_collection.insertOne(newContact, function(err, doc) {  
			if (err){
				return cb(err);
			}
			 cb(null,doc)
		});
		};	
 userInfoApi.getUserList=function(cb){
		user_collection.find({}).toArray(function(err, docs) {
			if (err){
				return cb(err);
			}
			 cb(null,docs)
		});
	};
	return userInfoApi;
}
