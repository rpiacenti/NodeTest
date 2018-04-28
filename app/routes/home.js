module.exports = function(app) {
    app.get("/",function(req, res) {

        // Get a conncetion to SQLite DB in conncetion Factory
        var connection = app.infra.connectionFactory();

        // Get Data from DB
        var listDao = new app.infra.TestDao(connection);

        listDao.listaJobsApplicants(function(results1){

        res.format({
                html: function(){
                    res.render('home/index',{data:results1});
                },
                json: function(){
                    res.json(results);
                }
            });

        })

  		connection.close();
        
    });
}