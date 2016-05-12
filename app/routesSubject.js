var objectSubject = require('./models/subjects'); //Import database model
var objectUser = require('./models/user'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {
// =====================================
// SUBJECTS ROUTES ======================
// =====================================
    
  app.get('/subjects', isLoggedIn, function(req, res) {

    objectSubject.find({},function(err, objectSubject) {
      if (err) {
        return res.send(err);
      }

      objectUser.find({},function(err, objectUser) { // Anidated for list objectUser
        if (err) {
          return res.send(err);
        }

        //objectSubject:objectSubject exports model subject to the template
        //objectUser:objectUser exports model User to the template (List Teachers)
        //user:req.user exports logged user info to the template
        //message:req.flash exports personalized alerts
        res.render('subjects.ejs',{
          objectSubject :objectSubject,
          objectUser    :objectUser,
          user          :req.user,
          message       :req.flash('signupMessage')
        });
      });
    });
  });

  app.post("/createSubject", upload.array('uploadContent',3), function(req,res){
    var datetime = new Date().toJSON().slice(0,10); // Captura AAAA-MM-DD actual
    var subjects = new objectSubject();

    subjects.code         = req.body.code
    subjects.codeTeacher  = req.body.codeTeacher
    subjects.name         = req.body.name
    subjects.initDate     = req.body.initDate
    subjects.status       = req.body.status
    subjects.description  = req.body.description
    subjects.save();

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

    res.redirect('/subjects');

   });

  //Recibe como parametro un Id y devuelve un objeto User
  app.get('/get-subject/:id', function(req, res) {

    var id = req.param("id");

    //Busca en la BD una materia con el Id ingresado como parametro
    objectSubject.findById(id, function(err, objSubject) {
      if (err) throw err;

      objSubject.save(function(err) {
        if (err) {
            res.send('error');
        }
        else {
            res.send(objSubject); //Retorna el objeto Subject
        }
      });
    });
  });


  //Recibe como parametro un Id y modifica el objeto Subject relacionado
  app.post('/modifySubject/:id', function(req, res) {

    var id = req.param("id");
    
    //Busca en la BD una materia con el Id ingresado como parametro
    objectSubject.findById(id, function(err, objSubject) {
      if (err) throw err;

      //console.dir(req.body);

      //Reemplaza la información de la materia
      objSubject.code         = req.body.code;
      objSubject.codeTeacher  = req.body.codeTeacher;
      objSubject.name         = req.body.name;
      objSubject.initDate     = req.body.initDate;
      objSubject.status       = req.body.status;
      objSubject.description  = req.body.description;

      //Guarda las modificaciones y redirige a la vista /subjects
      objSubject.save(function(err) {
        if (err) {
          res.end('error');
          res.redirect('/subjects');
        }
        else {
          res.redirect('/subjects');
        }
      });
    });
  });

  //Recibe como parametro un Id y elimina el objeto Subject relacionado
  app.get('/destroySubject/:id', function(req, res) {
    
    var id = req.param("id");

    objectSubject.remove({ _id: id }, function(err){
        if (err) {
            res.end('error');
        }
        else {
            res.end('success');
        }
    });
  });

  //=============== Archivos adjuntos Materias =============================

  /*app.get('/deleteSubjectFiles/:id', function(req, res) {
    var id = req.param("id");
    var path = './public/fotos/'+req.user._id+'/'+id+'/';

    fs.rmrf(path, function(err,status){
      if (err) {
      };
    });

    objectSubject.remove({ _id: id }, function(err){
      if (err) {
        res.end('error');
      } else {
        res.end('success');
      }
    });
  });

  app.post('/uploadSubjectFiles', upload.single('file'), function (req, res, next) {
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