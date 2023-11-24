const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {type: String, required: true, maxLength: 200},
    text: {type: String, required: true, maxLength: 500},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    timeStamp: {type: Date}
})

MessageSchema.virtual('timeStampFormatted').get(function () {
    return DateTime.fromJSDate(this.timeStamp).toFormat('T- dd-LL-yy')
} )

module.exports = mongoose.model("Message", MessageSchema);