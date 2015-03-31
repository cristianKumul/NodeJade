module.exports = function(app){

	
	app.get('/',function (req,res){

		res.render('index',
			{title: 'Index'}
			)
	})

	app.get('/send',function (req,res){

	  res.render('send',
	    {title: 'Send Data'}
	    )
	})
}