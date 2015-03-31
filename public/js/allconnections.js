

//var socket =io();//io.connect('/');
var map;




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

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; 2013 OpenStreetMap contributors',
        });


var map = L.map('map')
           .fitWorld()
           .setView([31.794525,-7.0849336], 3)
           .addLayer(osm);

var sentData = {};

var connects = {};
var markers = {};
var currentDest;
var	markerDest ={};
var active = false;

socket.on('oldcoords',function(data) {
	// body...
	//alert("Datos");
	for (var i = 0; i < data.length; i++) {
		setMarker(data[i]);
		//console.log(i);
	}

});
socket.on('load:coords', function(data) {
	console.log(data);
	if (!(data.id in connects)) {
		setMarker(data);
	}

	
});



function setMarker(data) {
	//for (var i = 0; i < data.coords.length; i++) {
		var marker = L.marker([data.coords[0].olat, data.coords[0].olng], { icon: yellowIcon}).addTo(map);
		marker.bindPopup('<p>¡Una venta aquí!<br>Usuario:<b>'+data.id+'</b><br>Destino:['+data.coords[0].dlat+','+data.coords[0].dlng+']<br>' );
		markers[data.id] = marker;//tmp={olat:'+data.coords[0].olat+',olng:'+data.coords[0].olng+',dlat:'+data.coords[0].dlat+',dlng:'+data.coords[0].dlng+'}
		//Se dibujan polyline
		var origin = data.coords[0];

		var pA = new L.LatLng(origin.olat, origin.olng);
		var pB = new L.LatLng(origin.dlat, origin.dlng);
		var pointL =[pA,pB];

		var polyline = L.polyline(pointL, {
	                weight: 40,
	                color: 'black',
	                opacity: 0.001
	            }).addTo(map);
	     
		polyline.on('mouseover', function () {
		this.setText( '\u2708     ', {repeat: true,
	                                      offset: 8,
	                                      attributes: {'font-weight': 'bold',
	                                                   'font-size': '24'}});
		});

	    polyline.on('mouseout', function () {
	        this.setText(null);
	    });
		
	    var destmarker = L.marker([origin.dlat, origin.dlng], { icon: redIcon}).addTo(map);
	    
	    destmarker.on('mouseover',function(){
	    	polyline.setText( '\u2708     ', {repeat: true,
	                                      offset: 8,
	                                      attributes: {'font-weight': 'bold',
	                                                   'font-size': '24'}});
	    });
	    destmarker.on('mouseout', function () {
	        polyline.setText(null);
	    });
	    currentDest = destmarker;
		//
		//_drawPolyline(data);
		marker.on('mouseover',function(){
		polyline.setText( '\u2708     ', {repeat: true,
		                              offset: 8,
		                              attributes: {'font-weight': 'bold',
		                                           'font-size': '24'}});
			 });
		 marker.on('mouseout', function () {
		polyline.setText(null);
    	});
		//var destmarker = L.marker([data.coords[0].dlat, data.coords[0].dlng], { icon: redIcon}).addTo(map);
	//}
}




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

function _drawPolyline(data){


	var origin = data.coords[0];

	var pA = new L.LatLng(origin.olat, origin.olng);
	var pB = new L.LatLng(origin.dlat, origin.dlng);
	var pointL =[pA,pB];
	//alert(origin.olat+","+origin.olng+","+origin.dlat+","+origin.dlng);
	
	
	var polyline = L.polyline(pointL, {
                weight: 40,
                color: 'black',
                opacity: 0.001
            }).addTo(map);
     

	polyline.on('mouseover', function () {
	this.setText( '\u2708     ', {repeat: true,
                                      offset: 8,
                                      attributes: {'font-weight': 'bold',
                                                   'font-size': '24'}});
	});

    polyline.on('mouseout', function () {
        this.setText(null);
    });
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
    
    destmarker.on('mouseover',function(){
    	polyline.setText( '\u2708     ', {repeat: true,
                                      offset: 8,
                                      attributes: {'font-weight': 'bold',
                                                   'font-size': '24'}});
    });
    destmarker.on('mouseout', function () {
        polyline.setText(null);
    });
    currentDest = destmarker;
}

