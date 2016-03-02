var objectUser = require('./models/user'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {
// =====================================
// USERS ROUTES ======================
// =====================================

  app.get('/users',function(req, res) {

    objectUser.find({},function(err, objectUser) {
      if (err) {
        return res.send(err);
      }

      //objectUser:objectUser exports model user to the template
      //user:req.user exports logged user info to the template
      //message:req.flash shows personalized alerts
      res.render('users.ejs',{ objectUser:objectUser, user:req.user, message:req.flash('signupMessage')})

    });
  });


  //Para subir una solo imagen usar upload.single
  app.post("/createUser", upload.array('photos',3), function(req,res){
      
    var datetime = new Date();
    var email = req.body.email;                
    var users = new objectUser();

    objectUser.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
          return done(err);

        // check to see if theres already a user with that email
        if (user) {
          //alert("El email ingresado ya se encuentra registrado");
          //console.dir("El email ingresado ya se encuentra registrado");
          return res.end("El email ingresado ya se encuentra registrado");
          //res.redirect('/users');
          //return req.flash('signupMessage', 'El email ingresado ya se encuentra registrado')
        } else {

          users.local.email    = req.body.email;
          users.local.password = users.generateHash(req.body.password); //Encrypt password
          users.local.role     = req.body.role;
          users.local.name     = req.body.name;

          //Save user
          users.save(function(err) {
            if(err) {
              console.dir(err);
              alert("Error creando usuario");
              res.redirect('/users');
            } else {
              console.log('user: ' + users.local.email + " saved.");
              res.redirect('/users');
            }
          });

        }
    });

    
    /*function(req, email, password, done) {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        users.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'El email ingresado ya se encuentra registrado'));
            } else {

                // set the user's local credentials
                users.local.email    = req.body.email;
                users.local.password = users.generateHash(req.body.password); //Encrypt password
                users.local.role     = req.body.role;
                users.local.name     = req.body.name;

                //Save user
                users.save(function(err) {
                  if(err) {
                    console.dir(err);
                    alert("Error creando usuario")
                    res.redirect('/users');
                  } else {
                    console.log('Usuario: ' + users.local.email + " creado");
                    res.redirect('/users');
                  }
                });
            }

        });

    }*/
  

    /*var objects_id = objects._id;
    var user_id = req.body._id;
    var main_dir='./public/fotos/';
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

    }*/

    //res.end('sucess');

  });

  
  app.get('/modifyUser/:id', function(req, res) {
    var id = req.param("id");
    var users = new objectUser();
    
    // get a user with ID class
    objectUser.findById(id, function(err, user) {
      if (err) throw err;

      // change the users information
      user.local.email = 'modificado@modificado.com';
      user.local.password = users.generateHash('modificado'); //Encrypt password
      user.local.role     = 'modificado';
      user.local.name     = 'modificado';

      // save the user
      user.save(function(err) {
        if (err) {
            res.end('error');
            console.dir(err);
        }
        else {
            res.end('success');
            console.log('Datos de usuario modificados');
        }
      });

    });
  });


  app.get('/destroyUser/:id', function(req, res) {
    var id = req.param("id");
    
    objectUser.remove({
        _id: id 
    },function(err){
        if (err) {
            res.end('error');
            console.dir(err);
        }
        else {
            res.end('success');
        }
    });
  });

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

};