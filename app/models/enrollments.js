var mongoosePaginate=require('mongoose-paginate');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var enrollmentSchema = new Schema({
    
    codeUser		: { type: Schema.Types.ObjectId, ref: 'User' },
    codeGrade		: { type: Schema.Types.ObjectId, ref: 'Grade' },
    year			: String,

});

enrollmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Enrollment', enrollmentSchema);
