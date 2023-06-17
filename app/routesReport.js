var objectArea = require('./models/areas'); //Import database model
var objectUser = require('./models/user'); //Import database model
var objectSubject = require('./models/subjects'); //Import database model
var objectAchievement = require('./models/achievements'); //Import database model
var objectActivity = require('./models/activities'); //Import database model
var objectEnrollment = require('./models/enrollments'); //Import database model
var objectEnrollmentSubjects = require('./models/enrollmentSubjects');
var objectQualification = require('./models/qualification'); 
var objectCourse = require('./models/courses'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var pdf = require('html-pdf');
var ejs = require('ejs');

module.exports = function(app, passport) {

	app.get('/report',isLoggedIn, function(req, res){
		objectUser.find({'local.role':'Estudiante','local.status':'Activo'},function(err, objectUser) {
	      if (err) {
	        return res.send(err);
	      }

	      //objectUser:objectUser exports model user to the template
	      //user:req.user exports logged user info to the template
	      //message:req.flash exports personalized alerts
	      res.render('report.ejs',{ 
	        objectUser:objectUser,
	        user:req.user,
	        message:req.flash('signupMessage')
	      });
	    });
	});

	app.get('/report-user/:id/:period',  function(req, res) {
		
		var id = req.param("id");
		var date = new Date();

		var period =	req.param("period");


		objectUser.findOne({_id:id}).populate('local.codeCourse').exec(function(err, user){
			if (err) {return res.send();}
			else{
				objectEnrollmentSubjects.find({'codeCourse':user.local.codeCourse._id}).populate('codeSubject').exec(function(err, subjects){
					if (err) {return res.send(err);}
					else{
						
						objectArea.find({},function(err, objectArea){
							if (err) {return res.send(err);}
							else{
								
								objectEnrollment.findOne({'codeUser':id, 'year':date.getFullYear()},function(err, objEnroll){
									if (err) {return res.send(err);}
									else{
										
										objectAchievement.find({'codeGrade':objEnroll.codeGrade,'period':period}).populate('codeSubject').exec(function(err, objAchievement){
											if (err) {return res.send(err);}
											else{	
												console.log(objAchievement);
												objectActivity.find({},function(err, objActivity){	
													if (err) {return res.send(err);}
													else{
															
														objectQualification.find({'codeGrade':objEnroll.codeGrade, 'codeUser':id},function(err, objQualification){
															if (err) {return res.send(err);}
															else{
																	

																res.render('reporte.ejs',{
																	date 				:date,
																	user 				:user,
																	areas 				:objectArea,
																	objectSubject 		:subjects,
																	objectEnrollment 	:objEnroll,
																	objAchievement 		:objAchievement,
																	objActivity 		:objActivity,
																	objQualification 	:objQualification
																	},function(err, html){
                      
										                                  if (err) {console.log(err)}
										                                  var options = {
										                                    format: 'folio',
										                                  };
										                                  res.pdfFromHTML({
										                                        filename: user.local.codeCourse+'/1.pdf',
										                                        htmlContent: html,
										                                        options: options,
										                                        save: true,
										                                    });
										                                });
															}	
														});
													}
												});
											}
										});		
									}
								});
								
							}	
						});
					}
				});
			}
		});
		
  	});

	app.get('/report-pdf/:id',  function(req, res) {
		
		var id = req.param("id");
		var date = new Date();

		var period 				= req.param.period;


		objectUser.findOne({_id:id}).populate('local.codeCourse').exec(function(err, user){
			if (err) {return res.send();}
			else{
				objectEnrollmentSubjects.find({'codeCourse':user.local.codeCourse._id}).populate('codeSubject').exec(function(err, subjects){
					if (err) {return res.send(err);}
					else{
						
						objectArea.find({},function(err, objectArea){
							if (err) {return res.send(err);}
							else{
								
								objectEnrollment.findOne({'codeUser':id, 'year':date.getFullYear()},function(err, objEnroll){
									if (err) {return res.send(err);}
									else{
										
										objectAchievement.find({'codeGrade':objEnroll.codeGrade,'period':period}).populate('codeSubject').exec(function(err, objAchievement){
											if (err) {return res.send(err);}
											else{	
												console.log(objAchievement);
												objectActivity.find({},function(err, objActivity){	
													if (err) {return res.send(err);}
													else{
															
														objectQualification.find({'codeGrade':objEnroll.codeGrade, 'codeUser':id},function(err, objQualification){
															if (err) {return res.send(err);}
															else{

																res.render('reporte.ejs',{
																	date 				:date,
																	user 				:user,
																	areas 				:objectArea,
																	objectSubject 		:subjects,
																	objectEnrollment 	:objEnroll,
																	objAchievement 		:objAchievement,
																	objActivity 		:objActivity,
																	objQualification 	:objQualification
																},function(err, html){
                      
										                                  if (err) {console.log(err)}
										                                  var options = {
										                                    format: 'folio',
										                                  };
										                                  res.pdfFromHTML({
										                                        filename: user.local.name+'.pdf',
										                                        htmlContent: html,
										                                        options: options,
										                                        save: false,
										                                    })
										                                });
															}	
														});
													}
												});
											}
										});		
									}
								});
								
							}	
						});
					}
				});
			}
		});
  	});
	//Devuelve todos los cursos
  app.get('/report-course', isLoggedIn, function(req, res){

    objectCourse.find({}, function(err, objCourse){
      if (err) {res.send(err)}
      else{
        res.render('report-course', {
        	objectCourse: 		objCourse,
	        user: 				req.user,
	        message: 			req.flash('signupMessage')
        });
      }
    });
  
  });

  //crea un folder para almacenar los pdf
  app.get('/folderPdf/:id', function(req, res){
  	var id = req.param("id");

  	if (!fs.existsSync(id)){
	    fs.mkdirSync(id);
	}

  	res.send('Create Folder');
  });

	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated())
	      return next();
		    res.redirect('/login');
		}
};