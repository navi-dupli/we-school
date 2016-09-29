var objectEnrollment = require('./models/enrollments'); //Import database model
var objectUser = require('./models/user'); //Import database model
var objectGrade = require('./models/grades'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {

	app.get('/enrollments', isLoggedIn, function(req, res) {

		var date = new Date();
		objectEnrollment.find({'year':date.getFullYear()}).populate('codeGrade').populate('codeUser').exec(function(err, objectEnrollments){
			if (err) {
				return res.send(err);
			}
			objectUser.find({'local.role':'Estudiante'}, function(err, objectUser){
				if(err){
					return res.send(err);
				}
				objectGrade.find({}, function(err, objectGrade){
					if(err){
						return res.send(err);
					}	
					res.render('enrollment.ejs',{
						objectEnrollments	: objectEnrollments,
						objectUser	  		: objectUser,
						objectGrade			: objectGrade,
						user          		: req.user,
	          			message       		: req.flash('signupMessage')
					});
				});
			});
		});
	});
	

	app.post('/createEnrollment', upload.array('photos',3),isLoggedIn,function(req,res){
		var datetime = new Date(); 
    	var enrollment = new objectEnrollment();

		enrollment.year 		=	datetime.getFullYear()
		enrollment.codeUser 	=	req.body.codeUser
		enrollment.codeGrade	=	req.body.codeGrade

		enrollment.save();

		res.redirect('/enrollments');
		
	});

	app.get('/get-enrollment/:id', function(req, res){

		var id = req.param("id");
		objectEnrollment.findById(id, function(err, objEnrollment){
			if (err) throw err;

		    objEnrollment.save(function(err) {
		       if (err) {
		           res.send('error');
		       }
		       else {
		           res.send(objEnrollment); //Retorna el objeto Course
		       }
		    });
		});

	});

	app.post('/modifyEnrollment/:id', function(req, res){

		var id = req.param("id");
		objectEnrollment.findById(id, function(err, objEnrollment){

			objEnrollment.codeUser		= req.body.codeUser;
			objEnrollment.codeGrade		= req.body.codeGrade;

			objEnrollment.save(function(err) {
		        if (err) {
		          res.end('error');
		          res.redirect('/enrollments');
		        }
		        else {
		          res.redirect('/enrollments');
		        }
		      });
		});

	});

	app.get('/destroyEnrollment/:id', function(req, res){

		var id = req.param("id");
		objectEnrollment.remove({ _id: id }, function(err){
	      if (err) {
	        res.end('error');
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
    res.redirect('/login');
  }

}