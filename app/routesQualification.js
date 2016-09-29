var objectQualification = require('./models/qualification'); //Import database model
var objectEnrollmentSubjects = require('./models/enrollmentSubjects');
var objectCourse = require('./models/courses'); //Import database model
var objectUser = require('./models/user'); //Import database model
var objectEnrollment = require('./models/enrollments'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {

	app.get("/qualification", isLoggedIn, function(req, res){

			objectEnrollmentSubjects.find({'codeTeacher':req.user._id}).populate('codeCourse').exec(function(err, objenroll){
			if (err) {
				res.send('error');
			}else{
				objectCourse.find({}, function(err, objectCourse){
					if (err) {
						res.send('err');
					}
					else{
						objectUser.find({'local.role':'Estudiante'}, function(err, objectUser){
							if(err){
								res.send('error');
							}
							else{
								res.render('qualification.ejs',{
						            objectCourse  : objectCourse,
						            objectUser    : objectUser,
						            objenroll     : objenroll,
						            user          : req.user,
						            message       : req.flash('signupMessage')
						        });
							}
						});
					}
				});
			}
		});

	});
	/*
	id: estudiante
	idEnSub: matricula de asignatura a un curso
	*/
	app.post('/qualification_user/:id/:idEnSub',function(req, res){

		var id 					= req.param("id");
		var idEnSub 			= req.param("idEnSub");
		var period 				= req.body.period;
		var observation			= req.body.observation;
		var qualification 		= req.body.qualification;
		var datetime 			= new Date();


		objectEnrollmentSubjects.findById(idEnSub, function(err, objEnrollSub){

			objectQualification.findOne({'codeUser': id, 'codeTeacher': objEnrollSub.codeTeacher, 'period': period, 'codeSubject':objEnrollSub.codeSubject}, function(err, objQual){
				if (err) {
					
				}else if(objQual){
					objQual.qualification 	= qualification;
					objQual.observation 	= observation;

					objQual.save(function(err){
						if (err) { res.send(err);}
						else{
							res.redirect('/qualification');
						}
					});

				}else{
					objectEnrollment.findOne({'codeUser':id, 'year': datetime.getFullYear()}, function(err, objEnroll){

						if (err) {

						}else{
							console.log(objEnroll);
							var objQualification = new objectQualification();

							objQualification.codeUser 		= 	id;
							objQualification.codeTeacher 	=	objEnrollSub.codeTeacher;
							objQualification.period 		=	period;
							objQualification.codeSubject 	=	objEnrollSub.codeSubject;
							objQualification.observation 	=	observation;
							objQualification.qualification 	=	qualification;
							objQualification.codeGrade	 	= 	objEnroll.codeGrade;

							objQualification.save(function(err){
								if (err) { res.send(err);}
								else{
									res.redirect('/qualification');
								}
							});
							
						}
					});
				}
			});
		});



		objectQualification.find({'codeUser':id, 'period':period });

	});

	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated())
	      return next();
		  res.redirect('/login');
	}
}