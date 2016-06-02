var objectAchievement = require('./models/achievements'); //Import database model
var objectSubject = require('./models/subjects'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {
    
  app.get('/achievements', isLoggedIn, function(req, res) {

    objectAchievement.find({},function(err, objectAchievement) {
      if (err) {
        return res.send(err);
      }
      objectSubject.find({},function(err, objectSubject) { // Anidated for list subjects
        if (err) {
          return res.send(err);
        }
          res.render('achievements.ejs',{
            objectAchievement : objectAchievement,
            objectSubject     : objectSubject,
            user              : req.user,
            message           : req.flash('signupMessage')
          });
      });
    });
  });

  app.post("/createAchievement", isLoggedIn, upload.array('uploadContent',3), function(req,res){
    var datetime = new Date().toJSON().slice(0,10); // Captura AAAA-MM-DD actual
    var achievements = new objectAchievement();

    achievements.codeSubject  = req.body.codeSubject
    achievements.name         = req.body.name
    achievements.description  = req.body.description
    achievements.save();

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

    res.redirect('/achievements');

   });

  app.get('/get-achievement/:id', function(req, res) {

    var id = req.param("id");

    objectAchievement.findById(id, function(err, objAchievement) {
      if (err) throw err;

      objAchievement.save(function(err) {
        if (err) {
            res.send('error');
        }
        else {
            res.send(objAchievement);
        }
      });
    });
  });

  app.post('/modifyAchievement/:id', function(req, res) {

    var id = req.param("id");
    
    objectAchievement.findById(id, function(err, objAchievement) {
      if (err) throw err;

      objAchievement.codeSubject  = req.body.codeSubject;
      objAchievement.name         = req.body.name;
      objAchievement.description  = req.body.description;

      objAchievement.save(function(err) {
        if (err) {
          res.end('error');
          res.redirect('/achievements');
        }
        else {
          res.redirect('/achievements');
        }
      });
    });
  });

  app.get('/destroyAchievement/:id', function(req, res) {
    
    var id = req.param("id");

    objectAchievement.remove({ _id: id }, function(err){
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