var mongoosePaginate=require('mongoose-paginate');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var activitySchema = new Schema({
    
    codeAchievement : String,
    name			: String,
    description		: String,
    initDate		: String,
    endDate			: String,
    sendStatus		: String

});

activitySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Activity', activitySchema);
