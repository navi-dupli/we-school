var mongoosePaginate=require('mongoose-paginate');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var enrollmentSubjectSchema = new Schema({
    
    codeSubject		: { type: Schema.Types.ObjectId, ref: 'Subject' },
    codeCurse		: { type: Schema.Types.ObjectId, ref: 'Course' },
    codeTeacher		: { type: Schema.Types.ObjectId, ref: 'User' },
    Hourlyintensity	: String, //intensidad horaria

});

enrollmentSubjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('EnrollmentSubjects', enrollmentSubjectSchema);
