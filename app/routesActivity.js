var objectActivity = require('./models/activities'); //Import database model
var objectAchievement = require('./models/achievements'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {
    
  app.get('/activities', isLoggedIn, function(req, res) {

    objectActivity.find().populate('codeAchievement').exec(function(err, objectActivity) {
      if (err) {
        return res.send(err);
      }
      objectAchievement.find({},function(err, objectAchievement) { // Anidated for list achievements
        if (err) {
          return res.send(err);
        }
          res.render('activities.ejs',{
            objectActivity    : objectActivity,
            objectAchievement : objectAchievement,
            user              : req.user,
            message           : req.flash('signupMessage')
          });
      });
    });
  });

  app.post("/createActivity", isLoggedIn, upload.array('uploadContent',3), function(req,res){
    var datetime = new Date().toJSON().slice(0,10); // Captura AAAA-MM-DD actual
    var activities = new objectActivity();

    activities.codeAchievement  = req.body.codeAchievement
    activities.name             = req.body.name
    activities.description      = req.body.description
    activities.initDate         = req.body.initDate
    activities.endDate          = req.body.endDate
    activities.sendStatus       = req.body.sendStatus
    activities.save();

    // Subida de archivos
    /*var activity_id = activities._id;
    var user_id = req.user._id;
    var main_dir = './public/attachments/';
    var name = ["foto1.jpg","foto2.jpg","foto3.jpg"];
    var final_path = main_dir+user_id+'/'+activity_id+'/';

    if (!fs.exists(main_dir+user_id)) {
      fs.mkdir(main_dir+user_id);
    }

    if(!fs.exists(final_path)){
      fs.mkdir(final_path);
    }

    for(var x=0; x<req.files.length; x++) {
      fs.createReadStream('./uploads/'+req.files[x].filename).pipe(fs.createWriteStream(final_path+req.files[x].originalname));
      fs.renameSync(final_path+req.files[x].originalname,final_path+name[x]);
      // Borra el archivo temporal creado
      fs.unlink('./uploads/'+req.files[x].filename);
    }*/

    res.redirect('/activities');

   });

  
  app.get('/get-activity/:id', function(req, res) {

    var id = req.param("id");

    objectActivity.findById(id, function(err, objActivity) {
      if (err) throw err;

      objActivity.save(function(err) {
        if (err) {
            res.send('error');
        }
        else {
            res.send(objActivity);
        }
      });
    });
  });


  app.post('/modifyActivity/:id', function(req, res) {

    var id = req.param("id");
    
    objectActivity.findById(id, function(err, objActivity) {
      if (err) throw err;

      objActivity.codeAchievement = req.body.codeAchievement;
      objActivity.name         = req.body.name;
      objActivity.description  = req.body.description;
      objActivity.initDate     = req.body.initDate;
      objActivity.endDate     = req.body.endDate;
      objActivity.sendStatus  = req.body.sendStatus;      

      objActivity.save(function(err) {
        if (err) {
          res.end('error');
          res.redirect('/activities');
        }
        else {
          res.redirect('/activities');
        }
      });
    });
  });

  app.get('/destroyActivity/:id', function(req, res) {
    
    var id = req.param("id");
    var path = './public/attachments/'+req.user._id+'/'+id+'/';

    // Borra los archivos adjuntos
    fs.rmrf(path, function(err,status){
      if (err) {
        console.log("Error borrando archivos adjuntos")
      };
    });

    // Borra el objeto
    objectActivity.remove({ _id: id }, function(err){
      if (err) {
        res.end('error');
      }
      else {
        res.end('success');
      }
    });
  });


  app.post('/uploadActivityAttachment', upload.single('file'), function (req, res, next) {
    res.send({
      message:'Archivo guardado',
      file:req.file
    });
  });


//ingresa el codigo del logro y se retornan todas las actividades
  app.get('/get-achiacti/:id', function(req, res) {

    var id = req.param("id");

    objectActivity.find({'codeAchievement':id}, function(err, objActivity) {
      if (err) {
        res.send(err);
      }
      else{
        res.send(objActivity); 
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