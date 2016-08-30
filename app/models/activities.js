var mongoosePaginate=require('mongoose-paginate');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var activitySchema = new Schema({
    
    codeAchievement : { type: Schema.Types.ObjectId, ref: 'Achievement' },
    name			: String,
    description		: String,
    initDate		: String,
    endDate			: String,
    sendStatus		: String

});

activitySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Activity', activitySchema);
