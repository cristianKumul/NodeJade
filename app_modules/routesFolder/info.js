module.exports = function(req, res){
	res.render('info', {
		title: "info",
	   	value: req.param("tagId")
	});
	//var id = req.param("tagId");
	//console.log("Parámetro por get : "+id);
};