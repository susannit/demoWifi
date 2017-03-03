'use strict';

userInfoApi=function(db) {
		 var user_collection = db.collection('WifiUserInfo');
		 
		 this.createUser=function (userObj){
		 var newContact = req.body;
		 newContact['createDate'] = new Date();
		 user_collection.insertOne(newContact, function(err, doc) {  
			return {
				err: err,
				doc: doc
			};
		});
		}
	
		this.getUserList=function(){
			 user_collection.find({}).toArray(function(err, docs) {
				return {
				err: err,
				docs: docs
				};
			});
		}
		
};
exports.userInfoApi=userInfoApi
