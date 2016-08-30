var mongoosePaginate=require('mongoose-paginate');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var achievementSchema = new Schema({
    
    codeSubject		: { type: Schema.Types.ObjectId, ref: 'Subject'},
    codeGrade		: { type: Schema.Types.ObjectId, ref: 'Grade' },
    name			: String,
    description		: String,
    period			: String,

});

achievementSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Achievement', achievementSchema);
