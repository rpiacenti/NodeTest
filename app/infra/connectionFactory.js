var sqlite3 = require('sqlite3').verbose(); 


function createDBConnection(){

	let db = new sqlite3.Database('./app/data/data.sqlite3', sqlite3.OPEN_READONLY, (err) => {
	  if (err) {
	    console.error(err.message);
	  }
	});

    return db;

	// if (!process.env.NODE_ENV || process.env.node === 'dev') {
	// 	return sqlite3.createConnection({
	// 		host: 'localhost',
	// 		user: 'root',
	// 		password: '',
	// 		database: 'casadocodigo_nodejs'
	// 	});
	// }

	// if (process.env.NODE_ENV == 'test') {
	// 	return sqlite3.createConnection({
	// 		host: 'localhost',
	// 		user: 'root',
	// 		password: '',
	// 		database: 'casadocodigo_nodejs_teste'
	// 	});
	// }

	// if (process.env.NODE_ENV == 'production') {
	// 	var url = process.env.CLEARDB_DATABASE_URL;
	// 	var grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
	// 	return sqlite3.createConnection({
	// 		host:grupos[3],
	// 		user:grupos[1],
	// 		password:grupos[2],
	// 		database:grupos[4]
	// 	});
	// }
}



module.exports = function() {
	return createDBConnection;
}