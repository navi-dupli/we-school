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
  app.post("/form", /*upload.array('photos',3),*/ function(req,res){
      
    var datetime = new Date();
    console.log("date: "+datetime);
    var users = new objectUser();

    users.local.email    = req.body.email;
    users.local.password = req.body.password;
    users.local.role     = req.body.role;
    users.local.name     = req.body.name;
    users.save();

    console.log("email: "+req.body.email);
    console.log("password: "+req.body.password);
    console.log("role: "+req.body.role);
    console.log("name: "+req.body.name);

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

    res.redirect('/dashboard');

  });


  app.get('/destroy/:id', function(req, res) {
    var id = req.param("id");
    var path = './public/fotos/'+req.user._id+'/'+id+'/';



    fs.rmrf(path, function(err,status){
      if (err) {
      };
    });


    users.remove({
        _id: id
    }, function(err){
        if (err) {
            res.end('error');
        }
        else {
            res.end('success');
        }
    });
  app.post('/subir', upload.single('file'), function (req, res, next) {
          /**
            images
          **/
          res.send({message:'Archivo guardado', file:req.file});
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