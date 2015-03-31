module.exports = function(app){

	app.get('/',function (req,res){

		res.render('index',
			{title: 'Index'}
			);
	});

	app.get('/send',function (req,res){

	  res.render('send',
	    {title: 'Send Data'}
	    );
	});

	app.get('/login', function(req, res){
        res.render('send', {
            title: 'Express Login'
        });
    });

}

module.exports = function(req,res){

	app.get('/foobar', function(req, res){
        res.render('send', {
            title: 'Express Login'
        });
    });
};