const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 50},
    last_name: {type: String, required: true, maxLength: 50},
    username: {type: String, required: true, maxLength: 50},
    password: {type: String, required: true, maxLength: 50},
    membership_status: {type: Boolean, required: true},
})

UserSchema.virtual('full_name').get(() => {
    let fullName = "";
    if (this.first_name && this.last_name) {
        fullName = `${this.first_name} ${this.last_name}`;
    }
    return fullName;
})

module.exports = mongoose.model("User", UserSchema);