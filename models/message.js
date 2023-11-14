const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {type: String, required: true, maxLength: 200},
    text: {type: String, required: true, maxLength: 500},
    timeStamp: {type: Date}
})

module.exports = mongoose.model("Message", MessageSchema);