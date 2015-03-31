
var tmp = []
	,items 
	,date;
exports.createTable = function(db){
	db.serialize(function() {
		db.run("CREATE TABLE if not exists coordsTable ( id NUM, user TEXT , originLat TEXT, originLng TEXT , originAcr TEXT,destLat TEXT, destLng TEXT , destAcr TEXT, date TEXT, timestamp DATE DEFAULT (datetime('now','localtime')))");
	});
};

exports.createObjets = function(db){
	
	
	db.all("SELECT * from coordsTable", function(err,row){

			
			//console.log(row[0]);
			for(var i=0;i < row.length; i++){

				var obj = {id: row[i].user,
						   active: true,
						   coords:[{
						   	olat:row[i].originLat,
						   	olng: row[i].originLng,
						   	oacr: row[i].originAcr,
						   	dlat: row[i].destLat,
						   	dlng: row[i].destLng,
						   	dacr: row[i].destAcr
						   }] };
				//console.log(obj);
				tmp.push(obj);

			}

			
	});
	var result = tmp;
	tmp =[];
	return result;
};

exports.getTotalItems =  function(db){

	
	db.all("SELECT * from coordsTable",function(err,row){

			items = row.length;
			
			console.log("Numero de items: "+items);
			//console.log(row[0]);
		
	});	
	
	return items;
}

exports.getDateTime = function(db){
	
	db.all("SELECT datetime('now','localtime')",function(err,row){

		date= String(row[0]['datetime(\'now\',\'localtime\')'])+'';
		
	});

	return date;
}

exports.insertRegister = function(db,parameters){

	db.run('INSERT INTO coordsTable VALUES(?,?,?,?,?,?,?,?,?,?)',parameters);
}