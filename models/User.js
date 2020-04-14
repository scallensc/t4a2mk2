const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: false
    },
    provider: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = User = mongoose.model("users", UserSchema);