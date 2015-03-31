

//var socket =io();//io.connect('/');
var map;

var info = $('#infobox');
var doc = $(document);

// custom marker's icon styles
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

var sentData = {};

var connects = {};
var markers = {};
var currentDest;
var	markerDest ={};
var active = false;
socket.on('load:oldcords',function(data) {
	// body...
	
	for (var i = 0; i < data.length; i++) {
		setMarker(data[i]);
	}

});
socket.on('load:coords', function(data) {
	
	if (!(data.id in connects)) {
		setMarker(data);
	}

	connects[data.id] = data;
	connects[data.id].updated = $.now();
});

map = L.map('map');

L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png', { maxZoom: 18, detectRetina: true }).addTo(map);

// set map bounds
map.fitWorld();

function setMarker(data) {
	//for (var i = 0; i < data.coords.length; i++) {
		var marker = L.marker([data.coords[0].olat, data.coords[0].olng], { icon: yellowIcon}).addTo(map);
		marker.bindPopup('<p>¡Una venta aquí!<br>Usuario:<b>'+data.id+'</b><br>Destino:['+data.coords[0].dlat+','+data.coords[0].dlng+']<br>' + '<a href="#" id="showRoute" data-coords=\'{"olat":"'+data.coords[0].olat+'","olng":"'+data.coords[0].olng+'","dlat":"'+data.coords[0].dlat+'","dlng":"'+data.coords[0].dlng+'"}\' onclick="drawPolyline();return false;" >Ver ruta</a></p> ');
		markers[data.id] = marker;//tmp={olat:'+data.coords[0].olat+',olng:'+data.coords[0].olng+',dlat:'+data.coords[0].dlat+',dlng:'+data.coords[0].dlng+'}
		
		//var destmarker = L.marker([data.coords[0].dlat, data.coords[0].dlng], { icon: redIcon}).addTo(map);
	//}
}

$("showRoute").click(function(){
	alert('Ruta');
	console.log("function");

});


function clearLayer(){
	for(i in map._layers) {
        if(map._layers[i]._path != undefined) {
            try {
                map.removeLayer(map._layers[i]);
            }
            catch(e) {
                console.log("problem with " + e + map._layers[i]);
            }
        }
    }
	
	if (currentDest != undefined){
		console.log(currentDest);
		map.removeLayer(currentDest);	
	}else{
		console.log("Está vacío");
	}
	


}

function drawPolyline(){


	var origin = $("a#showRoute").data('coords');
	var pA = new L.LatLng(origin.olat, origin.olng);
	var pB = new L.LatLng(origin.dlat, origin.dlng);
	var pointL =[pA,pB];
	//alert(origin.olat+","+origin.olng+","+origin.dlat+","+origin.dlng);
	clearLayer();
	
	var plane = L.polyline(pointL, {
                weight: 1,
                color: 'black',
                dashArray: '2, 2'
            }).addTo(map);
        plane.setText('\u2708     ', {repeat: true,
                                      offset: 8,
                                      attributes: {'font-weight': 'bold',
                                                   'font-size': '24'}});
	/*var danger = L.polyline(pointL, {
                weight: 10,
                color: 'orange',
                opacity: 0.8
            }).addTo(map);
        danger.setText('\u25BA', {repeat: true,
                                  offset: 6,
                                  attributes: {fill: 'red'}});
     */
    /*
		  var plane = L.polyline([[-49.38237, -37.26562],[-1.75754, -14.41406],[51.61802, -23.20312]], {
                weight: 1,
                color: 'black',
                dashArray: '2, 2'
            }).addTo(map);
        plane.setText('\u2708     ', {repeat: true,
                                      offset: 8,
                                      attributes: {'font-weight': 'bold',
                                                   'font-size': '24'}});
    */ 
    var destmarker = L.marker([origin.dlat, origin.dlng], { icon: redIcon}).addTo(map);
    
    currentDest = destmarker;
}

