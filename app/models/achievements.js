var mongoosePaginate=require('mongoose-paginate');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var achievementSchema = new Schema({
    
    codeSubject		: String,
    name			: String,
    description		: String

});

achievementSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Achievement', achievementSchema);
