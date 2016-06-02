var objectSubject = require('./models/subjects');
var objectUser = require('./models/user'); //Import database model to count users in dashboard
var objectCourse = require('./models/courses'); //Import database model to count courses in dashboard
var objectGrade = require('./models/grades'); //Import database model to count grades in dashboard

var console = require('console-prefix')
module.exports = function(app, passport) {

// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	app.get('/canvas', function(req, res) {
		res.render('canvas.ejs'); // load the index.ejs file
	});

	// DASHBOARD SECTION =========================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/dashboard', isLoggedIn, function(req, res) {

		objectUser.find({},function(err, objectUser) {
			if (err) {
				return res.send(err);
      		}

      		objectSubject.find({},function(err, objectSubject) {
				if (err) {
					return res.send(err);
	      		}

	      		objectCourse.find({},function(err, objectCourse) {
	      			if (err) {
	      				return res.send(err);
	      			}

	      			objectGrade.find({},function(err, objectGrade) {
	      			if (err) {
	      				return res.send(err);
	      			}

				      	//objectUser:objectUser exports model user to the template
				      	//objectSubject:objectSubject exports model subects to the template
				      	//objectCourse:objectCourse exports model courses to the template
				      	//objectGrade:objectGrade exports model grades to the template
				      	//user:req.user exports logged user info to the template
				      	//message:req.flash exports personalized alerts
				      	res.render('dashboard.ejs',{
				      		objectSubject:objectSubject,
				      		objectUser:objectUser,
				      		objectCourse:objectCourse,
				      		objectGrade:objectGrade,
				      		user:req.user, // get the user out of session and pass to template
				      		message:req.flash('signupMessage')});
			      	});
				});
			});
	    });

	});

	// PROFILE SECTION =========================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile',isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
			
		});
	});

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

// ===================================================================================
// AUTHENTICATE (FIRST LOGIN) ========================================================
// ===================================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login', function(req, res) {

			// render the page and pass in any flash data if it exists
			res.render('login.ejs', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/dashboard', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			// render the page and pass in any flash data if it exists
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/dashboard', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
	    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

	    // handle the callback after facebook has authenticated the user
	    app.get('/auth/facebook/callback',
	        passport.authenticate('facebook', {
	            successRedirect : '/dashboard',
	            failureRedirect : '/'
	        }));

	// twitter --------------------------------

		// send to twitter to do the authentication
	    app.get('/auth/twitter', passport.authenticate('twitter'));

	    // handle the callback after twitter has authenticated the user
	    app.get('/auth/twitter/callback',
	        passport.authenticate('twitter', {
	            successRedirect : '/dashboard',
	            failureRedirect : '/'
	        }));
	
	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback/',
			passport.authenticate('google', {
	        	successRedirect : '/dashboard',
	            failureRedirect : '/'
	        }));

// =======================================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =======================
// =======================================================================================
	
	// locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.code	    = undefined;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.local.role 	= undefined;
        user.local.name 	= undefined;
        user.local.status   = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.facebook.id 	= undefined;
        user.facebook.name 	= undefined;
        user.facebook.photo = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', function(req, res) {
        var user           			= req.user;
        user.twitter.token 			= undefined;
        user.twitter.id 			= undefined;
        user.twitter.username 		= undefined;
        user.twitter.displayName 	= undefined;
        user.save(function(err) {
           res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function(req, res) {
        var user          	= req.user;
        user.google.token 	= undefined;
        user.google.id 		= undefined;
        user.google.name 	= undefined;
        user.google.email 	= undefined;
        user.google.photo 	= undefined;
        user.save(function(err) {
           res.redirect('/profile');
        });
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}
