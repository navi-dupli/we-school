// app/models/courses.js
// load the things we need
var mongoosePaginate=require('mongoose-paginate');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our course model
var courseSchema = mongoose.Schema({

    code            : String,
    name            : String,
    codeTeacher		: String,
    creationDate    : String,
    status          : String,
    description     : String

});

courseSchema.plugin(mongoosePaginate);

// create the model for courses and expose it to our app
module.exports = mongoose.model('Course', courseSchema);