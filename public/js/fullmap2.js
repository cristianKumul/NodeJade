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


/*Contenedor para la seleccion de tipo de grafica*/
grafControl = L.control({position: 'bottomleft'});
grafControl.onAdd = function(map) {
  grafControl._div = L.DomUtil.create('div', 'grafControl');
  this.queue = [];
  return this._div;
}

/*Contenedor para las graficas*/
grafControl.addTo(map);
Control = L.control({position: 'topleft'});
Control.onAdd = function(map) {
  Control._div = L.DomUtil.create('div', 'Control');
  this._div.innerHTML = '<div class="options"><form id="optionsGraph"><input type="radio" name="opt" value="1" checked>Ninguno<br><input type="radio" name="opt" value="2">Radar<br><input type="radio" name="opt" value="3">Circular</form></div>';
  return this._div;
}
Control.addTo(map);

/*validamos que radioButton esta activo para pintar el tipo de grafica
  1: Ninguno
  2: Radar
  3: Circular
*/	
$('input[type=radio][name=opt]').change(function () {
  checked = $("input[name='opt']:checked").val();
  switch(checked){

    case '1':
      ocultarGraficas();
      break;            			
    case '2':
      ocultarGraficas();
      crearGraficaRadar();
      break;	
    case '3':
      ocultarGraficas();
      crearGraficaCircular();
      break;
  }
    
});


div = '<div  style="width:100%"><canvas id="canvas"></canvas></div>';
grafControl._div.innerHTML = div;

function ocultarGraficas(){
 grafControl._div.innerHTML = div;
}

function crearGraficaRadar(){
  var radarChartData = {
  labels: ['Hotel','Vuelo','Paquetes','Autobus','Auto','Transportación','Tour','Crucero','Circuito'],
  datasets: [
   {
    label: "Marcas Propias",
    fillColor: "rgba(240,66,118,0.7)",
    strokeColor: "rgba(240,66,118,0.7)",
    pointColor: "rgba(240,66,118,0.7)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(240,66,118,0.7)",
    data: ventasServicio[0]
   },
   {
    label: "Terceros",
    fillColor: "rgba(0,54,91,0.7)",
    strokeColor: "rgba(0,54,91,0.7)",
    pointColor: "rgba(0,54,91,0.7)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(0,54,91,0.7)",
    data: ventasServicio[1]
   },

   {
    label: "Corporativo",
    fillColor: "rgba(0,127,22,0.7)",
    strokeColor: "rgba(0,127,22,0.7)",
    pointColor: "rgba(0,127,22,0.7)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(0,127,22,0.7)",
    data: ventasServicio[2]
   }

  ]
 };
 
 grafica = new Chart(document.getElementById("canvas").getContext("2d")).Radar(radarChartData, {
  responsive: false
 });
}

function crearGraficaCircular(){
 var data = [
      {
          value: ventasCanal[0],
          color:"#f47a9f ",
          highlight: "#f04276",
          label: "Marcas Propias"
      },
      {
          value: ventasCanal[1],
          color: "#4c728c",
          highlight: "#00365B",
          label: "Terceros"
      },
      {
          value: ventasCanal[2],
          color: "#4ca55b",
          highlight: "#007F16",
          label: "Corporativo"
      }
  ];


 grafica = new Chart(document.getElementById("canvas").getContext("2d")).Doughnut(data);
}
