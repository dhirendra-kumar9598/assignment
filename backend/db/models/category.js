const mongoose=require('mongoose');
const catSch=mongoose.Schema({
    name:String
});
module.exports=mongoose.model('categories',catSch);
