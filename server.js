//Dependencias
var express = require('express')
  , app = express()//require('express')()
  //, http = require('http').createServer(app)//Server(app)
  , stylus = require('stylus')
  , nib = require('nib')
  , logger = require('morgan')
  , database = require('./app_modules/database')
  , io = require('socket.io').listen(app.listen(process.env.PORT || 8080))//require('socket.io')(http)
  , sqlite3 = require('sqlite3').verbose()
  , f = require('./app_modules/backendFunctions');

var numItems,date;

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
//app.use(logger)
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'));


//require('./app_modules/routes')(app);
app.get('/', require('./app_modules/routesFolder/index'));
app.get('/send', require('./app_modules/routesFolder/send'));
app.get('/map', require('./app_modules/routesFolder/map'));
app.get('/graph',require('./app_modules/routesFolder/graphics'));
app.get('/map1',require('./app_modules/routesFolder/map1'))
app.get('/test',require('./app_modules/routesFolder/test'))
// Se crea la base de datos
app.use(require('./app_modules/routesFolder/404'))
var db = new sqlite3.Database('ven.db');

database.createTable(db);

//conexiones al socket.io
//io.listen(http);
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
//cuando un usuario se conecte, enviamos las coordenadas actuales
    console.log("Nueva conexion");
    var datos = database.createObjets(db);
    socket.emit('oldcoords',datos);
    socket.emit('foo',datos);
    socket.emit('random',f.getRandomData());
    socket.on('reqRandom',function(data){
      console.log("solicitud de random");
      socket.emit('random',f.getRandomData());
    });
    //console.log(datos);
  // Evento de envio de datos
    socket.on('send:coords', function (data) {
        //console.log('Datos: '+data.id + ", " + data.active + "," +'[' + data.coords[0].olat+',' + data.coords[0].olng +','+data.coords[0].oacr + ']');
        //Se transmite hacia los usuarios conectados
        console.log(data);
        socket.broadcast.emit('load:coords', data);
        numItems = database.getTotalItems(db);
        date = database.getDateTime(db);
        var params = [numItems, data.id, data.coords[0].olat, data.coords[0].olng, data.coords[0].oacr,data.coords[0].dlat, data.coords[0].dlng, data.coords[0].dacr, date,date];
        database.insertRegister(db,params);
    });
    socket.on('intervalCoords', function (data) {
        //console.log('Datos: '+data.id + ", " + data.active + "," +'[' + data.coords[0].olat+',' + data.coords[0].olng +','+data.coords[0].oacr + ']');
        //Se transmite hacia los usuarios conectados
        //console.log(data);
        socket.broadcast.emit('load:coords', data);
       
    });

});

//http.listen(8080)


console.log('Servidor iniciado...')