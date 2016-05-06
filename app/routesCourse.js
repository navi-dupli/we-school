var objectCourse = require('./models/courses'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {
// =====================================
// COURSES ROUTES ======================
// =====================================

  app.get('/courses', isLoggedIn, function(req, res) {
    
    objectCourse.find({}, function(err, objectCourse) {
      if (err) {
        return res.send(err);
      }

      //objectCourse:objectCourse exports model Course to the template
      //user:req.user exports logged user info to the template
      //message:req.flash exports personalized alerts
      res.render('courses.ejs',{
        objectCourse  : objectCourse,
        user          : req.user,
        message       : req.flash('signupMessage')
      });
    });
  });

  app.post("/createCourse", upload.array('uploadContent',3), function(req,res){
    var datetime = new Date().toJSON().slice(0,10); // Captura AAAA-MM-DD actual
    var courses = new objectCourse();

    courses.code          = req.body.code
    courses.name          = req.body.name
    courses.creationDate  = datetime
    courses.status        = req.body.status
    courses.description   = req.body.description
    courses.save();

    /*
    var courses_id = courses._id;
    var user_id = req.user._id;
    var main_dir='./public/fotos/';
    var name = ["frente.jpg","atras.jpg","derecho.jpg"];
    var final_path = main_dir+user_id+'/'+courses_id+'/';

    // Subida de archivos
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

    res.redirect('/courses');

  });

  //Recibe como parametro un Id y devuelve un objeto Course
  app.get('/get-course/:id', function(req, res) {

    var id = req.param("id");
    
    //Busca en la BD un curso con el Id ingresado como parametro
    objectCourse.findById(id, function(err, objCourse) {
      if (err) throw err;

      objCourse.save(function(err) {
        if (err) {
            res.send('error');
        }
        else {
            res.send(objCourse); //Retorna el objeto Course
        }
      });
    });
  });


  //Recibe como parametro un Id y modifica el objeto Course relacionado
  app.post('/modifyCourse/:id', function(req, res) {

    var id = req.param("id");
    
    //Busca en la BD un curso con el Id ingresado como parametro
    objectCourse.findById(id, function(err, objCourse) {
      if (err) throw err;

      //console.dir(req.body);

      //Reemplaza la información del curso
      objCourse.code          = req.body.code;
      objCourse.name          = req.body.name;
      objCourse.status        = req.body.status;
      objCourse.description   = req.body.description;
      
      //Guarda las modificaciones y redirige a la vista /courses
      objCourse.save(function(err) {
        if (err) {
          res.end('error');
          res.redirect('/courses');
        }
        else {
          res.redirect('/courses');
        }
      });
    });
  });

  //Recibe como parametro un Id y elimina el objeto Course relacionado
  app.get('/destroyCourse/:id', function(req, res) {
    
    var id = req.param("id");

    objectCourse.remove({ _id: id }, function(err){
        if (err) {
            res.end('error');
        }
        else {
            res.end('success');
        }
    });
  });

  //=============== Archivos adjuntos Cursos =============================

  /*app.get('/deleteCourseFiles/:id', function(req, res) {
    var id = req.param("id");
    var path = './public/fotos/'+req.user._id+'/'+id+'/';

    fs.rmrf(path, function(err,status){
      if (err) {
      };
    });

    objectCourse.remove({ _id: id }, function(err){
      if (err) {
        res.end('error');
      } else {
        res.end('success');
      }
    });
  });

  app.post('/uploadCourseFiles', upload.single('file'), function (req, res, next) {
    res.send({message:'Archivo guardado', file:req.file});
  });*/

  // route middleware to make sure
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
  }
  
};