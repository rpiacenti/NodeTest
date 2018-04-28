function TestDao(connection) {
    this._connection = connection;
}

TestDao.prototype.listaJobsApplicants = function(callback) {   // this._connection.query('select * from livros',callback);
	var list1 = [];
	// Qurery to extract Applications
   	this._connection.parallelize(() => {
   		let sql = `select A.name as jobname, B.name as appliacantname, B.cover_letter, B.email, B.website,
   					(select distinct C.name from skills as C where C.applicant_id = B.id and A.ID = B.job_id) as skill, 
   					(Select count(*) from applicants where job_id = A.id) as nsapplicant, 
					(Select distinct count(*) from skills where applicant_id = B.id) as nskill from jobs as A 
					inner join applicants as B On A.ID = B.job_id
					group by jobname, appliacantname
					order by jobname, appliacantname `
        this._connection.all(sql, [], (err, rows1) => {
        	if (err) {
            	console.error(err.message);
        	}

	    	list1.push(rows1);
	    
		    // Qurery to extract Job Types
		    this._connection.parallelize(() => {
			    let sql = `select A.name, count(B.name) as numapplicant from jobs as A, applicants as B
							where A.id = B.job_id
							group by A.id`
			    this._connection.all(sql, [], (err, rows2) => {
			    	if (err) {
			        	console.error(err.message);
			    	}

		        list1.push(rows2);

		    	});
			});

		    // Qurery to extract Applicants and Skils Types
		    this._connection.parallelize(() => {
		   		let sql = `select distinct A.name, B.name as applicantskill from skills as A, applicants as B
							where A.applicant_id = B.id
							order by B.name`
			    this._connection.all(sql, [], (err, rows3) => {
			    
			        list1.push(rows3);
			        // callback with 3 lists
			        callback(list1, err);
			    });
		    });
        
    	});

	});
};


module.exports = function(){
    return TestDao;
};