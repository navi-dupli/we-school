// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '172903693082584', // your App ID
        'clientSecret'  : '54a449a7e936fc55bfdda5bd670167fb', // your App Secret
        'callbackURL'   : 'http://colegios.herokuapp.com/auth/facebook/callback'
        //'callbackURL'   : 'http://localhost:5000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : '8rSKeDvSIKtPO92APfXwpbhbv',
        'consumerSecret'    : '9KLSsDvjpO2aevLenB5gja6kFVfLAYc0plvpi8kzP18nvRAABi',
        'callbackURL'       : 'http://colegios.herokuapp.com/auth/twitter/callback'
        //'callbackURL'       : 'http://127.0.0.1:5000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '449808425298-qvr9pksc0h7q8uulv3q0v7ldr24oums4.apps.googleusercontent.com',
        'clientSecret'  : '4fNU4JR3B3tyhA3uN1DgU8Lq',
        'callbackURL'   : 'http://colegios.herokuapp.com/auth/google/callback'
        //'callbackURL'   : 'http://127.0.0.1:5000/auth/google/callback'
    },

};