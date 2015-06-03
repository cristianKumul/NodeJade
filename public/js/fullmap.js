var map;
var checked;
var ventasCanal=[0,0,0];
var ventasServicio=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
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

var map = L.map('fullmap', {zoomControl:false })
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

