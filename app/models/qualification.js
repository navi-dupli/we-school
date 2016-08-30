var mongoosePaginate=require('mongoose-paginate');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var qualificationSchema = new Schema({
    
    codeUser		: { type: Schema.Types.ObjectId, ref: 'User' },
    codeTeacher		: { type: Schema.Types.ObjectId, ref: 'User' },
    codeSubject		: { type: Schema.Types.ObjectId, ref: 'Subject'},
    codeGrade		: { type: Schema.Types.ObjectId, ref: 'Grade' },
    qualification 	: String,
    observation		: String,
    period			: String,


});

qualificationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Qualification', qualificationSchema);