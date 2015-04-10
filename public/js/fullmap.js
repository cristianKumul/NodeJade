var map;
var ventasCanal=[0,0,0];
var tinyIcon = L.Icon.extend({
	options: {
		shadowUrl: '../assets/marker-shadow.png',
		iconSize: [25, 39],
		iconAnchor:   [12, 36],
		shadowSize: [41, 41],
		shadowAnchor: [12, 38],
		popupAnchor: [0, -30]
	}
});

var redIcon = new tinyIcon({ iconUrl: '../assets/marker-red.png' });
var yellowIcon = new tinyIcon({ iconUrl: '../assets/marker-yellow.png' });
var priceIcon = new tinyIcon({iconUrl:'../assets/price.jpg'});

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; 2014 OpenStreetMap contributors',
        });

var map = L.map('fullmap')
           .fitWorld()
           .setView([31.794525,-7.0849336], 3)
           .addLayer(osm);
myControl = L.control({position: 'topright'});
	myControl.onAdd = function(map) {
	            myControl._div = L.DomUtil.create('div', 'myControl');
	            this.queue = [];
	            return this._div;
	}
myControl.addTo(map);

grafControl = L.control({position: 'bottomleft'});
	grafControl.onAdd = function(map) {
	            grafControl._div = L.DomUtil.create('div', 'grafControl');
	            this.queue = [];
	            return this._div;
	}
grafControl.addTo(map);
crearGrafica();
function crearGrafica(){
		var data = [
			    {
			        value: 0,
			        color:"#f47a9f ",
			        highlight: "#f04276",
			        label: "Marcas Propias"
			    },
			    {
			        value: 0,
			        color: "#4c728c",
			        highlight: "#00365B",
			        label: "Terceros"
			    },
			    {
			        value: 0,
			        color: "#4ca55b",
			        highlight: "#007F16",
			        label: "Corporativo"
			    }
			];
		/*var radarChartData = {
		labels: ['Hotel','Transportación','Vuelo','Tour','Auto','Paquetes','Autobus','Crucero','Circuito'],
		datasets: [
			{
				label: "Marcas Propias",
				fillColor: "rgba(240,66,118,0.7)",
				strokeColor: "rgba(240,66,118,0.7)",
				pointColor: "rgba(240,66,118,0.7)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(240,66,118,0.7)",
				data: [0,0,0,0,0,0,0,0,0]
			},
			{
				label: "Terceros",
				fillColor: "rgba(0,54,91,0.7)",
				strokeColor: "rgba(0,54,91,0.7)",
				pointColor: "rgba(0,54,91,0.7)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(0,54,91,0.7)",
				data: [0,0,0,0,0,0,0,0,0]
			},

			{
				label: "Corporativo",
				fillColor: "rgba(0,127,22,0.7)",
				strokeColor: "rgba(0,127,22,0.7)",
				pointColor: "rgba(0,127,22,0.7)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(0,127,22,0.7)",
				data: [0,0,0,0,0,0,0,0,0]
			}

		]
	};*/
	div = '<div  style="width:100%"><canvas class="foo" id="canvas" height="200%" width="200%"></canvas></div>';
	



	grafControl._div.innerHTML = div;

		/*myRadar = new Chart(document.getElementById("canvas").getContext("2d")).Radar(radarChartData, {
			responsive: false
		});*/
		var myDoughnutChart = new Chart(document.getElementById("canvas").getContext("2d")).Doughnut(data);


	}