var mongoosePaginate=require('mongoose-paginate');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var gradeSchema = mongoose.Schema({

    code            : String,
    name            : String,
    creationDate	: String,

});

gradeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Grade', gradeSchema);