
function _setMarker(data) {
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




function _clearLayer(){
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
	
    var destmarker = L.marker([origin.dlat, origin.dlng], { icon: redIcon}).addTo(map);
    
    currentDest = destmarker;
}

