var objectRecipe = require('./models/recipes');
var console = require('console-prefix');
module.exports = function(app) {

  app.get('/', function(req, res) {
    objectRecipe.find({},function(err, objectRecipe) {
      if (err) {
        return res.send(err);
      }
      res.render('recipes.ejs',{
        objectRecipe      : objectRecipe,
        user              : req.user
      });
    });
  });
};

