var connects = {};
var markers = {};
var intervalMarker ={};
var coordinates={};
var listMarker=[];
var markerId;
var tiempoMarcador=900000;



var icons=['hotels','transfers','flights','tours','cars','packages','buses','cruises','circuits'],
	canal=['propias','terceros','corporativo'],
	colorCanal=['#f04276','#007F16','#00365B'];

socket.on('config:client', function(data) {

			tiempoMarcador=data.marcador*1000;
			
});
socket.on('load:coords', function(data) {
	var n = Object.keys(markers).length;

	markerId = data.id;
	if (!(data.id in connects) ) {
		
		
		setMarker(data);
		
		var markersBounds = [];
		if ( Object.keys(markers).length > 2){
			for (var i in markers){
				markersBounds.push(markers[i]);
				//console.log(markers[i]);
			} 
			var group= new L.featureGroup(markersBounds);
			map.fitBounds(group.getBounds(),{padding: [50, 50],maxZoom:15});
			//console.log( Object.keys(markers).length);
		}
		

	}
	

	connects[data.id] = data;
	connects[data.id].updated = $.now();
	connects[data.id].timeout = true;

	
});


function setMarker(data) {
	
		if(data.tipoServicio!=9){
			
			var marker = L.marker([data.destino.lat, data.destino.lon],
								{ bounceOnAdd: true, bounceOnAddOptions: {duration: 500, height: 50},
								 icon: L.AwesomeMarkers.icon({icon: icons[data.tipoServicio -1], prefix: 'icon', markerColor: canal[data.canal -1], spin:false}) }).addTo(map);	

		
			coordinates[marker.getLatLng()] = data.id;

			
		marker.bindPopup('<p>¡Una venta aquí!<br>Usuario:<b>'+data.tipoServicio+'</b><br>Destino:['+data.destino.lat+','+data.destino.lon+']<br>' + '<a href="#" id="showRoute" data-coords=\'{"olat":"'+data.destino.lon+'","olng":"'+data.destino.lon+'","dlat":"'+data.destino.lon+'","dlng":"'+data.destino.lon+'"}\' onclick="drawPolyline();return false;" >Ver ruta</a></p> ');
	
		markers[data.id] = marker;
		map.addLayer(markers[data.id]);

		if(marker.getLatLng() in coordinates){
				//console.log("Existe");
				var randomlat = (Math.random() * (0.001 - (-0.001)) + (-0.001));
				var randomlon = (Math.random() * (0.001 - (-0.001)) + (-0.001));
				//console.log(randomlat);
				//console.log(randomlon);
				newCoord = new L.LatLng(data.destino.lat+randomlat,data.destino.lon+randomlon);
				marker.setLatLng(newCoord);
				marker.update();
				//console.log(marker.getLatLng());
				delete connects[data.id];
				delete coordinates[markers[data.id].getLatLng()];
				map.removeLayer(markers[data.id]);
				delete markers[data.id];
				var marker = L.marker([data.destino.lat+randomlat, data.destino.lon+randomlon],
								{ bounceOnAdd: true, bounceOnAddOptions: {duration: 500, height: 50},
								 icon: L.AwesomeMarkers.icon({icon: icons[data.tipoServicio -1], prefix: 'icon', markerColor: canal[data.canal -1], spin:false}) }).addTo(map);	

				coordinates[marker.getLatLng()] = data.id;
				markers[data.id] = marker;
				map.addLayer(markers[data.id]);
			}




		bar([icons[data.tipoServicio -1],canal[data.canal -1]]);
		}
		else{
			var marker2 = L.marker([data.destino[0].lon, data.destino[0].lat], { bounceOnAdd: true, bounceOnAddOptions: {duration: 500, height: 50}, icon: L.AwesomeMarkers.icon({icon: icons[data.tipoServicio -1], prefix: 'icon', markerColor: canal[data.canal -1], spin:false}) }).addTo(map);
			marker2.bindPopup('<p>¡Una venta aquí!<br>Usuario:<b>'+data.tipoServicio+'</b><br>Destino:['+data.destino.lat+','+data.destino.lon+']<br>' + '<a href="#" id="showRoute" data-coords=\'{"olat":"'+data.destino.lon+'","olng":"'+data.destino.lon+'","dlat":"'+data.destino.lon+'","dlng":"'+data.destino.lon+'"}\' onclick="drawPolyline();return false;" >Ver ruta</a></p> ');
			bar([icons[data.tipoServicio -1],canal[data.canal -1]]);
			var circuito = L.layerGroup([marker2]);
			var latlngs = [L.latLng(data.destino[0].lon, data.destino[0].lat)];
			for (var i = 1; i < data.destino.length; i++) {
				var marker = L.marker([data.destino[i].lon, data.destino[i].lat], { icon: L.AwesomeMarkers.icon({icon: icons[data.tipoServicio -1], prefix: 'icon', markerColor: canal[data.canal -1], spin:false}) }).addTo(map);
				circuito.addLayer(marker);
				
			}
			var i = 1;
			circuito.eachLayer(function (layer) {
   					 layer.bindPopup("Circuito: Día "+i);
   					 latlngs.push(layer._latlng);
   					 foo = [latlngs[i-1],latlngs[i]]
   					 var polyline = L.polyline(foo, {color: colorCanal[data.canal -1]});
   					 circuito.addLayer(polyline);
   					 //console.log(layer._latlng);
   					 i=i+1;
				});
			markers[data.id] = circuito;
			map.addLayer(markers[data.id]);
			
		}
		
}

function bar(data){
	
	if(myControl.queue.length > 9){
    		myControl.queue.shift();
    	}
    	myControl.queue.push(data);
    	
    	tabla = '<div><nav class="navbar navbar-barra"><div class="container-fluid"><div id="navbar" class="navbar-collapse collapse"><ul class="nav navbar-nav">';
    	for(var i=0; i<myControl.queue.length; i++){
    		tabla =  tabla + '<li><a href="#"><span class="icon icon-'+myControl.queue[i][0]+ ' canal-'+myControl.queue[i][1]+'"></span></a></li>';
    	}
    	tabla += '</ul></div></div></nav></div>';

    	
    	myControl._div.innerHTML = tabla;
    	
}


// elimina cada n tiempo el marcador que cumpla la condici
function intervalTrigger(marker){
	return window.setInterval(function() {
		try {opacity = marker.options.opacity;
		marker.setOpacity( opacity- 0.01);}catch(e){}
	},10);


}

// elimina cada n tiempo el marcador que cumpla la condici
setInterval(function() {
	for (var ident in connects){
		if ($.now() - connects[ident].updated > (tiempoMarcador-1000)) {
					if (connects[ident].timeout){
							connects[ident].timeout = false;
							intervalMarker[ident] = intervalTrigger(markers[ident]);

					}
					
					//console.log("Entrando............ "+markers[ident].options.opacity);
					
					

		}
		if ($.now() - connects[ident].updated > tiempoMarcador) {
			//console.log(markers[ident]);
			delete connects[ident];
			delete coordinates[markers[ident].getLatLng()];
			map.removeLayer(markers[ident]);
			delete markers[ident];
			window.clearInterval(intervalMarker[ident]);

		}
	}
}, 1000);