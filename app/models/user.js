// app/models/user.js
// load the things we need
var mongoosePaginate=require('mongoose-paginate');
var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        code         : String,
        email        : String,
        password     : String,
        role         : String,
        name         : String,
        status       : String,
        codeCourse   : { type: Schema.Types.ObjectId, ref: 'Course' }, //codigo del curso 
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        photo        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        photo        : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

//===============================================
userSchema.plugin(mongoosePaginate);