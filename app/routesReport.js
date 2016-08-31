var objectArea = require('./models/areas'); //Import database model
var objectUser = require('./models/user'); //Import database model
var objectSubject = require('./models/subjects'); //Import database model
var objectAchievement = require('./models/achievements'); //Import database model
var objectActivity = require('./models/activities'); //Import database model
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });


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

	app.get('/report-user',  function(req, res) {
		

		objectSubject.find({}).populate({path: "code", model:objectAchievement}).exec(function(err,ob){
			if(err){
				console.log(err);
				return res.send(err);	
			} 
			else{
				console.log(ob);
				return res.send(ob);
			}
		});
		/**objectSubject.find({},function(err, objectSubject) {
			objectAchievement.populate(objectSubject, {path: "code"},function(err, achievements){
	            console.log(achievements);
	        });
	    });**/ 
  	});

	app.get('/report-pdf/:id',  function(req, res) {
		
		/*var cursor;
		objectUser.findOne({_id:"56e272ffad33dd9d262dff06"}, function(err, user){
			if (err) {return res.send();}
			else{
				cursor=user;
				cursor.save();
				objectSubject.find({},function(err, objectSubject) {
					if (err) {console(err);return res.send();}
					else{
						console(objectSubject);
					}
				});
				console.log(cursor);
			}

		});*/
		var id = req.param("id");
		var date = new Date();
		objectUser.findOne({_id:id}, function(err, user){
			if (err) {return res.send();}
			else{
				objectArea.find({},function(err, objectArea){
					if(err){console.log(err)}
					else{
						objectSubject.find({},function(err, objectSubject){
							if(err){console.log(err)}
							else{
								res.render('reporte.ejs',{
									date 			:date,
									user 			:user,
									areas 			:objectArea,
									objectSubject 	:objectSubject
									},function(err, html){
			
									if (err) {console.log(err)}
									var options = {
										format: 'Legal',
									};
									res.pdfFromHTML({
								        filename: 'generated.pdf',
								        htmlContent: html,
								        options: options,
						    		});
								} );	
							}	
						});
					}
				});
			}
		});

		
		

  	});
  	app.get('/report-pdf2', function(req, res){

		var html5pdf = require("html5-to-pdf");


html5pdf({paperFormat:'legal'}).from(app.get('views')+"/reporte.ejs").to("document.pdf", function () {
  console.log("Done")
});

		/*var params = {css:app.get('css')};
		res.render('reporte.ejs', params, function(err, html){
			console.log(html);

			res.pdfFromHTML({
		        filename: 'generated.pdf',
		        htmlContent: html,
		    });

  
		} );*/
  

		});
			
	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated())
	      return next();
		    res.redirect('/login');
		}
};