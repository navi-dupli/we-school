var objectGrade = require('./models/grades'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {
    
  app.get('/grades', isLoggedIn, function(req, res) {

    objectGrade.find({},function(err, objectGrade) {
      if (err) {
        return res.send(err);
      }
        //objectGrade:objectGrade exports model grade to the template
        //user:req.user exports logged user info to the template
        //message:req.flash exports personalized alerts
        res.render('grades.ejs',{
          objectGrade   : objectGrade,
          user          : req.user,
          message       : req.flash('signupMessage')
        });
    });
  });

  app.post("/createGrade", upload.array('uploadContent',3), function(req,res){
    var datetime = new Date().toJSON().slice(0,10); // Captura AAAA-MM-DD actual
    var grades = new objectGrade();

    grades.code         = req.body.code
    grades.name         = req.body.name
    grades.creationDate = datetime
    grades.save();

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

    res.redirect('/grades');

   });

  app.get('/get-grade/:id', function(req, res) {

    var id = req.param("id");

    objectGrade.findById(id, function(err, objGrade) {
      if (err) throw err;

      objGrade.save(function(err) {
        if (err) {
            res.send('error');
        }
        else {
            res.send(objGrade);
        }
      });
    });
  });


  app.post('/modifyGrade/:id', function(req, res) {

    var id = req.param("id");
    
    objectGrade.findById(id, function(err, objGrade) {
      if (err) throw err;

      objGrade.code         = req.body.code;
      objGrade.name         = req.body.name;

      objGrade.save(function(err) {
        if (err) {
          res.end('error');
          res.redirect('/grades');
        }
        else {
          res.redirect('/grades');
        }
      });
    });
  });

  app.get('/destroyGrade/:id', function(req, res) {
    
    var id = req.param("id");

    objectGrade.remove({ _id: id }, function(err){
        if (err) {
            res.end('error');
        }
        else {
            res.end('success');
        }
    });
  });

  //=============== Archivos adjuntos Grados =============================

  /*app.get('/deleteSubjectFiles/:id', function(req, res) {
    var id = req.param("id");
    var path = './public/fotos/'+req.user._id+'/'+id+'/';

    fs.rmrf(path, function(err,status){
      if (err) {
      };
    });

    objectGrade.remove({ _id: id }, function(err){
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

  function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
      return next();

    res.redirect('/login');
  }
};