const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    address: String,
    password:String,
    imageUrl:String
})
module.exports = mongoose.model('users', userSchema);