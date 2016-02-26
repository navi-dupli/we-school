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
    
    object.find({"idUser" : req.user._id},function(err, object) {
      if (err) {
        return res.send(err);
      }
      
    
    res.render('objects.ejs',{ object:object,user : req.user})
    });
   	});
  //cantidad de imagenes upload.single
  app.post("/objects",isLoggedIn, upload.single("file")), function(req,res){
      var datetime = new Date();
      var objects = new object();
    
          objects.idCurso = req.body.idCurso
          objects.idUser = req.user._id
          objects.nombreMateria = req.body.nombreMateria
          objects.fechaInicio = datetime
          objects.estado = req.body.estado
          objects.descripcion = req.body.descripcion
          objects.save();

          var objects_id = objects._id;
          var user_id = req.user._id;
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

          }
          
          res.redirect('/objects');

   });


  app.get('/destroy/:id', function(req, res) {
    var id = req.param("id");
    var path = './public/fotos/'+req.user._id+'/'+id+'/';
    
    

    fs.rmrf(path, function(err,status){
      if (err) {
      };
    });
   

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