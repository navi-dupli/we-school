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
  app.post("/objects",isLoggedIn, upload.array('photos',3), function(req,res){
      var datetime = new Date();
      var objects = new object();
          objects.year = req.body.year
          objects.idUser = req.user._id
          objects.price = req.body.price
          objects.city = req.body.province
          objects.brand = req.body.brand
          objects.model = req.body.model
          objects.cyl = req.body.cyl
          objects.styleCar = req.body.styleCar
          objects.priceNegotiable = req.body.priceNegotiable
          objects.colorFront = req.body.colorFront
          objects.colorBack = req.body.colorBack
          objects.fuelCar = req.body.fuelCar
          objects.transmissionCar = req.body.transmissionCar
          objects.kmCar = req.body.kmCar
          objects.transmissionCar = req.body.transmissionCar
          objects.doorCar = req.body.doorCar
          objects.date = datetime
          objects.save();

          var objects_id = objects._id;
          var user_id = req.user._id;
          var main_dir='./public/fotos/';
          var name = ["frente.jpg","atras.jpg","derecho.jpg"];
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