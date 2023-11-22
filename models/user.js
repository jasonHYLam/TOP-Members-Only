const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;



const UserSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 50},
    last_name: {type: String, required: true, maxLength: 50},
    username: {type: String, required: true, minLength: 4, maxLength: 50, unique: 'Username already taken'},
    password: {type: String, required: true},
    membership_status: {type: Boolean, required: true},
    admin_status: {type: Boolean, required: true},
})

UserSchema.virtual('full_name').get(() => {
    let fullName = "";
    if (this.first_name && this.last_name) {
        fullName = `${this.first_name} ${this.last_name}`;
    }
    return fullName;
})

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);