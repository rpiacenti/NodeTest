var app = require('./config/express')();
var http = require('http').Server(app);



var porta = process.env.PORT || 3000;
var server = http.listen(porta, function () {

	app.set('views', __dirname + '/app/views/');

	//console.log(app.views);

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});