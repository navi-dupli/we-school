var object = require('../models/subjects');
var console = require('console-prefix');
var fs = require('fs.extra');
var multer  = require('multer');//carga de archivos
var paginate = require('express-paginate');//matriz utilizada
var upload = multer({ dest: 'uploads/' })
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.use(paginate.middleware(2, 2));//asignamos el tamaño de la matriz
  	app.get('/car', isLoggedIn, function(req, res, next) {

  		object.paginate({}, { page: req.query.page, limit: req.query.limit }, function(err, object, pageCount, itemCount) {

  			if (err) return next(err);

			res.render('cardObjects.ejs', {
				user : req.user, // get the user out of session and pass to template
				object: object,
				pageCount: pageCount,
				itemCount: itemCount,
				actualPage: req.query.page,
				pages: paginate.getArrayPages(req)(2, pageCount, req.query.page)
			});
  		});

  	});

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}