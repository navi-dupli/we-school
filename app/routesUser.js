var objectUser = require('./models/user'); //Import database model
var objectCourse = require('./models/courses'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {
// =====================================
// USERS ROUTES ======================
// =====================================

  app.get('/users', isLoggedIn, function(req, res) {

    objectUser.find({},function(err, objectUser) {
      if (err) {
        return res.send(err);
      }

      //objectUser:objectUser exports model user to the template
      //user:req.user exports logged user info to the template
      //message:req.flash exports personalized alerts
      res.render('users.ejs',{ 
        objectUser:objectUser,
        user:req.user,
        message:req.flash('signupMessage')
      });
    });
  });


  //Para subir una sola imagen se puede usar upload.single
  app.post("/createUser", isLoggedIn, upload.array('photos',3), function(req,res){

    var datetime = new Date();
    var email = req.body.email;
    var code = req.body.code;
    var users = new objectUser();

    objectUser.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
          return done(err);

        // check to see if theres already a user with that email
        if (user) {
          //return res.end("El email ingresado ya se encuentra registrado");
          console.log("El email ingresado ya se encuentra registrado");
          //return req.flash('signupMessage', 'El email ingresado ya se encuentra registrado');
          res.redirect('/users');
        } else {

          // check to see if theres already a user with that code
          objectUser.findOne({ 'local.code' :  code }, function(err, user) {

            if (err)
            return done(err);

            if (user) {
              //return req.flash('signupMessage', 'El código ingresado ya se encuentra registrado');
              console.log("El código ingresado ya se encuentra registrado");
              res.redirect('/users');
            } else {

              users.local.code     = req.body.code;
              users.local.email    = req.body.email;
              users.local.password = users.generateHash(req.body.password); //Encrypt password
              users.local.role     = req.body.role;
              users.local.name     = req.body.name;
              users.local.status   = req.body.status;

              //Save user
              users.save(function(err) {
                if(err) {
                  console.dir(err);
                  res.redirect('/users');
                } else {
                  console.log('user: ' + users.local.email + " saved.");
                  res.redirect('/users');
                }
              });
            }
          });
        }
    });
  });


  //Recibe como parametro un Id y devuelve un objeto User
  app.get('/get-user/:id', function(req, res) {

    var id = req.param("id");
    console.log(id);

    //Busca en la BD un usuario con el Id ingresado como parametro
    objectUser.findById(id, function(err, objUser) {
      if (err) throw err;

      objUser.save(function(err) {
        if (err) {
            res.send('error');
        }
        else {
            res.send(objUser); //Retorna el objeto User
        }
      });
    });
  });


  //Recibe como parametro un Id y modifica el objeto User relacionado
  app.post('/modifyUser/:id', function(req, res) {

    var id = req.param("id");
    var users = new objectUser();

    //Busca en la BD un usuario con el Id ingresado como parametro
    objectUser.findById(id, function(err, objUser) {
      if (err) throw err;

      //Reemplaza la información del usuario
      objUser.local.code     = req.body.code;
      objUser.local.email    = req.body.email;
      objUser.local.password = users.generateHash(req.body.password); //Encrypt password
      objUser.local.role     = req.body.role;
      objUser.local.name     = req.body.name;
      objUser.local.status   = req.body.status;

      //Guarda las modificaciones y redirige a la vista /users
      objUser.save(function(err) {
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


  //Recibe como parametro un Id y elimina el objeto User relacionado
  app.get('/destroyUser/:id', function(req, res) {
    
    var id = req.param("id");

    objectUser.remove({ _id: id },function(err){
        if (err) {
            res.end('error');
        }
        else {
            res.end('success');
        }
    });
  });

  //Retorna todos los estudiantes
  app.get('/showUsers', function(req, res){

    objectUser.find({'local.role':'Estudiante'},{'local.code':1,'_id':0}, function(err, objectUser){
      if (err) {
        res.send(err);
      }else{
         res.send(objectUser); 
      }
    });
  });

  app.get('/registerCourse', isLoggedIn,function(req, res){

    objectUser.find({'local.role': 'Estudiante'}).populate('local.codeCourse').exec(function(err, objectUser){
      if (err) {res.send(err);}
      else{
        objectCourse.find(function(err, objectCourse){
          res.render('registerCourse.ejs',{
            objectCourse   :objectCourse,
            objectUser     :objectUser,
            user           :req.user,
            message        :req.flash('signupMessage')
          });
        });
      }
    });

  });

  app.post('/modifyRegisterCourse/:id', function(req, res){

    var id = req.param("id");

    objectUser.findById(id, function(err, objUser) {
      if (err) throw err;

      //Reemplaza la información del usuario
      objUser.local.codeCourse  = req.body.codeCourse;

      //Guarda las modificaciones y redirige a la vista /users
      objUser.save(function(err) {
        if (err) {
          res.end('error');
          res.redirect('/registerCourse');
        }
        else {
          res.redirect('/registerCourse');
        }
      });
    });

  });

  app.get('/estudents-course/:id', function(req, res){  
    var id = req.param("id");

    objectUser.find({'local.codeCourse':id,'local.role':'Estudiante'}, function(err, objUser){
      if (err) {res.send(err)}
        else{
          res.send(objUser);
        }
    });

  });
    

  // route middleware to make sure
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
  }

};