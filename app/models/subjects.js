var mongoosePaginate=require('mongoose-paginate');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var objectSchema = new Schema({
    nameRecipes:String,
    description: String,
    ingredients: String,
    steps: String,
    image: String,
});

objectSchema.plugin(mongoosePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Recipes', objectSchema);
