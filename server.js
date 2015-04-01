//Dependencias
var express = require('express')
  , app = express()//require('express')()
  //, http = require('http').createServer(app)//Server(app)
 //, stylus = require('stylus')
 // , nib = require('nib')
 , io = require('socket.io').listen(app.listen(process.env.PORT || 8080));//require('socket.io')(http)



app.set('views', __dirname + '/views')
app.set('view engine', 'jade')


app.use(express.static(__dirname + '/public'));


//require('./app_modules/routes')(app);
app.get('/', require('./app_modules/routesFolder/index'));
app.get('/send', require('./app_modules/routesFolder/send'));
app.get('/map', require('./app_modules/routesFolder/map'));
app.get('/icons',require('./app_modules/routesFolder/graphics'));
app.get('/map1',require('./app_modules/routesFolder/map1'))
app.get('/test',require('./app_modules/routesFolder/test'))
// Se crea la base de datos
app.use(require('./app_modules/routesFolder/404'))



//conexiones al socket.io
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
//cuando un usuario se conecte, enviamos las coordenadas actuales
    console.log("Nueva conexion");
    //console.log(datos);
  // Evento de envio de datos
    socket.on('send:coords', function (data) {
  //Se transmite hacia los usuarios conectados
        console.log(data);
        socket.broadcast.emit('load:coords', data);
        
    });
    socket.on('intervalCoords', function (data) {
       //Se transmite hacia los usuarios conectados
        //console.log(data);
        socket.broadcast.emit('load:coords', data);
       
    });

});

//http.listen(8080)


console.log('Servidor iniciado...')