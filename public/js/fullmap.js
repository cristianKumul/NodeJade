var map;
var checked;

/*Diccionarios de ayuda en las graficas
	ventasCanal: Hace una suma de los marcadores desde el momento que se abre el mapa y almacena por canal de venta
	ventasSercivio: HAce una suma de los marcadores de acuerdo del tipo de servicio de la venta
*/
var ventasCanal=[0,0,0];
var ventasServicio=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];




/*Inicializacion del mapa
	fullmap: es el contenedor html que aloja el mapa
	zoomControl: deshabilita los botones de zoom
	setView: cambia las coordenadas de inicio, y zoom inicial
	addLayer: agrega la referencia de OpenStreetMap 
*/
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; 2014 OpenStreetMap contributors',
});

var map = L.map('fullmap', {zoomControl:false })
           .fitWorld()
           .setView([31.794525,-7.0849336], 3)
           .addLayer(osm);


/*Contenedor para barra de Ventas
	Se crea un div que guardara cada uno de los iconos de ventas,
	se crea una cola para las ventas, donde se guardaran las ultimas 10 ventas realizadas
*/
barraVentas = L.control({position: 'topright'});

barraVentas.onAdd = function(map) {
    barraVentas._div = L.DomUtil.create('div', 'barraVentas');
    this.queue = [];
    return this._div;
}

barraVentas.addTo(map);

