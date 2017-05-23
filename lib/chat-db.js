var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chat', function(err){
	if(err) {
		console.log(err);
	} else {
		console.log('Connection Established to MongoDB');
	}
});

var chatSchema = mongoose.Schema({ //Schema of the Collection
	nick: String,
	msg: String,
	created: {type: Date, default: Date.now}
});

var Chat = mongoose.model('Message', chatSchema); //creates a collection names Chat and addes the Schema to it

exports.getOldMsgs = function(limit, cb){ //shows old messages for auser who joins the chat
	var query = Chat.find({});
	query.sort('-created').limit(limit).exec(function(err, docs){
		cb(err, docs);
	});
}

exports.saveMsg = function(data, cb){// saves messages to MongoDB database
	var newMsg = new Chat({msg: data.msg, nick: data.nick});
	newMsg.save(function(err){
		cb(err);
	});
};