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

var redIcon = new tinyIcon({ iconUrl: '../assets/marker-red.png' });
var yellowIcon = new tinyIcon({ iconUrl: '../assets/marker-yellow.png' });
var priceIcon = new tinyIcon({iconUrl:'../assets/price.jpg'});

var osm = L.tileLayer('https://{s}.tiles.mapbox.com/v4/cristiankumul.eb03c723/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY3Jpc3RpYW5rdW11bCIsImEiOiJKdTZZMGZjIn0.Ti8bOdNWiOBXKMp2TDAIdA',{//'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; 2014 OpenStreetMap contributors',
        });

var map = L.map('map')
           .fitWorld()
           .setView([31.794525,-7.0849336], 2)
           .addLayer(osm);

