const mongoose = require("mongoose");

const cartSch = mongoose.Schema({
  user_id: String,
  id: Number,
  quantity: Number,
 
});
module.exports = mongoose.model("cart", cartSch);
