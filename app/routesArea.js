var objectArea = require('./models/areas'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {

	app.get("/area", isLoggedIn, function(req, res){
		objectArea.find(function(err, areas){
			if(err){
				return res.send(err);
			}
			else{
				res.render('areas.ejs',{
					areas:areas,
					user:req.user,
	        		message:req.flash('signupMessage')
				});
			}
		});

	});

	app.post("/createArea", isLoggedIn, upload.array('uploadContent',3), function(req, res){
	   	var area = new objectArea();
	    area.name         = req.body.name
	    area.save();

	    res.redirect('/area');

   	});

   	app.post("/modifyArea/:id", isLoggedIn, function(req, res){
   		var id = req.param("id");
   		objectArea.findById(id,function(err, objArea){
   			if(err) throw err;
   			else{
	    		objArea.name         = req.body.name
	    		objArea.save(function(err){
					if (err) {
						res.send('error');
						res.redirect('/subjects');
					}
					else{
						res.redirect('/area');
					}
				});	
   			}
   		});
   	});

   	app.get("/destroyArea/:id", isLoggedIn, function(req, res){
   		var id = req.param("id");
   		objectArea.remove({_id: id}, function(err){
   			if(err){
   				res.send('error');
   			}
   			else{
   				res.send('success');
   			}
   		});
   	});

	app.get("/get-area/:id", isLoggedIn, function(req, res){
		var id = req.param("id");
		objectArea.findById(id, function(err, objArea) {
			if(err) throw err;
			else{
				objArea.save(function(err){
					if (err) {
						res.send('error')
					}
					else{
						res.send(objArea);
					}
				});
			}
	    });
	});

	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated())
	      return next();
		  res.redirect('/login');
	}
}