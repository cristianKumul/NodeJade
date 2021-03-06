var map;

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

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; 2014 OpenStreetMap contributors',
            minZoom:2
        });

var map = L.map('map')
           .fitWorld()
           .setView([31.794525,-7.0849336], 2)
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