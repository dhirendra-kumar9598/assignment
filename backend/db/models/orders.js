const mongoose = require("mongoose");
const orderSch = mongoose.Schema({
  user_id: String,
  item:Array,
  fullname: String,
  address: String,
  phone: Number,
  email: String,
  amount:Number,
  status:String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  date: Date,
});

module.exports = mongoose.model("orders", orderSch);
