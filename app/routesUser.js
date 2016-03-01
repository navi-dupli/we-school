var objectUser = require('./models/user');
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

      res.render('users.ejs',{ objectUser:objectUser,user : req.user})

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
                return res.end("ya existe");
            } else {

              users.local.email    = req.body.email;
              users.local.password = users.generateHash(req.body.password); //Encrypt password
              users.local.role     = req.body.role;
              users.local.name     = req.body.name;

              //Save user
              users.save(function(err) {
                if(err) {
                  console.dir(err);
                  res.end("{success: false}");
                } else {
                  console.log('user: ' + users.local.email + " saved.");
                  res.redirect('/dashboard');
                }
              });

            }
    });


  

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


  app.get('/destroyUser/:id', function(req, res) {
    var id = req.param("id");
    
    objectUser.remove({
        _id: id 
    }, function(err){
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