var express = require('express');
var load = require('express-load');
var routes = require('routes');
var bodyParser = require('body-parser');
var path = require('path')
//var expressValidator = require('express-validator');

module.exports = function() {

    path.dirname('/Users/ronald/objective/objectiveTest');

    var app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
//    app.set('views', path.join(__dirname, 'views'));
    app.engine('ejs', require('ejs').renderFile);
    
    
    //app.use(expressValidator());

    load('routes',{cwd: 'app',verbose:true})
        .then('infra')
        .into(app);

    app.use(function(req, res, next){
        res.status(404).render("erros/404");
    });

    // app.use(function(error,req, res, next){
    //     res.status(500).render("erros/500");
    // });
    
    return app;
};
