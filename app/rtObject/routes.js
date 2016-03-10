var object = require('../models/objects');
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {
      // =====================================
    // OBJECTS ROUTES ======================
    // =====================================
  app.get('/objects',function(req, res) {

    object.find({},function(err, object) {
      if (err) {
        return res.send(err);
      }


    res.render('objects.ejs',{ object:object,user : req.user})
    });
    });
  //cantidad de imagenes upload.single
  app.post("/form", upload.array('photos',3), function(req,res){
      var datetime = new Date();
      var objects = new object();
      var dC = req.body.diaCurso;
      var mC = req.body.mesCurso;
      var aC = req.body.anoCurso;
      var fechaInicio =dC+'-'+mC+'-'+aC;
      console.log(fechaInicio+'err')
          objects.idCurso = req.body.idCurso
          objects.idUser = req.body.idDocente
          objects.nombreMateria = req.body.nombreMateria
          objects.fechaInicio = fechaInicio
          objects.estado = req.body.estado
          objects.descripcion = req.body.descripcion
          objects.save();

          var objects_id = objects._id;
          var user_id = req.body._id;
 /**         var main_dir='./public/fotos/';
          var name = ["Maretia.jpg"];
          var final_path = main_dir+user_id+'/'+objects_id+'/';

          if (!fs.exists(main_dir+user_id)) {
            fs.mkdir(main_dir+user_id);
          }

          if(!fs.exists(final_path)){
            fs.mkdir(final_path);
          }

          for(var x=0;x<req.files.length;x++) {
            fs.createReadStream('./uploads/'+req.files[x].filename).pipe(fs.createWriteStream(final_path+req.files[x].originalname));
            fs.renameSync(final_path+req.files[x].originalname,final_path+name[x]);
            //borramos el archivo temporal creado
            fs.unlink('./uploads/'+req.files[x].filename);

          }**/

          res.redirect('/dashboard');

   });

  //Recibe como parametro un Id y devuelve un objeto User
  app.get('/get-user2/:id', function(req, res) {

    var id = req.param("id");

    //Busca en la BD un usuario con el Id ingresado como parametro
    objectUser.findById(id, function(err, user) {
      if (err) throw err;

      user.save(function(err) {
        if (err) {
            res.send('error');
        }
        else {
            res.send(user); //Retorna el objeto User
        }
      });
    });

  });


  //Recibe como parametro un Id y modifica el objeto User relacionado
  app.post('/modifyUser2/:id', function(req, res) {

    var id = req.param("id");
    var users = new objectUser();

    //Busca en la BD un usuario con el Id ingresado como parametro
    objectUser.findById(id, function(err, user) {
      if (err) throw err;

      //console.dir(req.body);

      //Reemplaza la información del usuario
      user.local.email    = req.body.email;
      user.local.password = users.generateHash(req.body.password); //Encrypt password
      user.local.role     = req.body.role;
      user.local.name     = req.body.name;

      //Guarda las modificaciones y redirige a la vista /users
      user.save(function(err) {
        if (err) {
          res.end('error');
          res.redirect('/users');
        }
        else {
          res.redirect('/users');
        }
      });

    });
  });

  app.get('/destroy/:id', function(req, res) {
    var id = req.param("id");

    object.remove({
        _id: id
    }, function(err){
        if (err) {
            res.end('error');
        }
        else {
            res.end('success');
        }
    });
});

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

};