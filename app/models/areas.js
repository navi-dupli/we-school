var mongoosePaginate=require('mongoose-paginate');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var areaSchema = new Schema({
    name			: String,
});

areaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Area', areaSchema);
