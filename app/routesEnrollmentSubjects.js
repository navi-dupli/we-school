var objectEnrollmentSubjects = require('./models/enrollmentSubjects');
var objectCourse = require('./models/courses'); //Import database model
var objectSubject = require('./models/subjects'); //Import database model
var objectUser = require('./models/user'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


module.exports = function(app, passport) {
	app.get('/enrollmentSubjects', isLoggedIn, function(req, res) {

		objectEnrollmentSubjects.find().populate('codeCourse').populate('codeTeacher').populate('codeSubject').exec(function(err, objectEnrollmentSubjects){

			console.log(objectEnrollmentSubjects);
			
			objectCourse.find({},function(err, objectCourse){
				
				objectSubject.find({},function(err, objectSubject){
					
					objectUser.find({'local.role':'Docente'},function(err,objectUser){
						
						res.render('enrollmentSubjects',{
							objectEnrollmentSubjects	: objectEnrollmentSubjects,
							objectCourse				: objectCourse,
							objectUser					: objectUser,
							objectSubject 				: objectSubject,
							user             			: req.user,
           					message           			: req.flash('signupMessage')
						});

					});

				});

			});

		});

	});

	app.post('/createEnrollmentSubject', isLoggedIn, upload.array('uploadContent',3), function(req,res){

		var enrollmentSubject = new objectEnrollmentSubjects();
		
		enrollmentSubject.codeSubject 		= req.body.codeSubject
		enrollmentSubject.codeCourse		= req.body.codeCourse
		enrollmentSubject.codeTeacher		= req.body.codeTeacher
		enrollmentSubject.hourlyintensity	= req.body.IH
		enrollmentSubject.save();

		res.redirect('/enrollmentSubjects');

	});

	app.get('/get-erolSubj/:id',function(req, res){
		var id = req.param("id");

		objectEnrollmentSubjects.findById(id, function(err, objEnrollmentSubjects){
			if (err) throw err;

		    objEnrollmentSubjects.save(function(err) {
		       if (err) {
		           res.send('error');
		       }
		       else {
		           res.send(objEnrollmentSubjects); //Retorna el objeto Course
		       }
		    });
		});

	});

	app.post('/modifyEnrollmentSubject/:id', function(req, res){

		var id = req.param("id");
		objectEnrollmentSubjects.findById(id, function(err, objEnrollmentSubjects){

			objEnrollmentSubjects.codeSubject 		= req.body.codeSubject;
			objEnrollmentSubjects.codeCourse		= req.body.codeCourse;
			objEnrollmentSubjects.codeTeacher		= req.body.codeTeacher;
			objEnrollmentSubjects.hourlyintensity	= req.body.IH;

			objEnrollmentSubjects.save(function(err) {
		        if (err) {
		          res.end('error');
		          res.redirect('/enrollmentSubjects');
		        }
		        else {
		          res.redirect('/enrollmentSubjects');
		        }
		      });
		});

	});

	app.get('/destroyEnrollSubj/:id', function(req, res){
		var id = req.param("id");
		objectEnrollmentSubjects.remove({ _id: id }, function(err){
	      if (err) {
	        res.end('error');
	      }
	      else {
	        res.end('success');
	      }
	    });
	});


	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on
	    if (req.isAuthenticated())
	      return next();

	    // if they aren't redirect them to the home page
	    res.redirect('/login');
  	}
}
