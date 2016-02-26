var mongoosePaginate=require('mongoose-paginate');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var objectSchema = new Schema({
    idCurso:String,
    idUser: String,
    nombreMateria: String,
    fechaInicio: String,
    estado: String,
    descripcion: String,
});

objectSchema.plugin(mongoosePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Object', objectSchema);

