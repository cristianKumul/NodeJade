var connects = {};
var markers = {};
var coordinates={};
var listMarker=[];
var markerId;
var tiempoMarcador=30000;



var icons=['hotels','transfers','flights','tours','cars','packages','buses','cruises','circuits'],
	canal=['propias','terceros','corporativo'],
	colorCanal=['#f04276','#007F16','#00365B'];

socket.on('config:client', function(data) {

			tiempoMarcador=data.marcador*1000;
			
});
socket.on('load:coords', function(data) {
	var n = Object.keys(markers).length;
	//alert(n);
	markerId = data.id;//Math.random().toString(16).substring(2,15);
	if (!(data.id in connects) ) {
		
		var currentCoord = new  L.LatLng(data.destino.lat,data.destino.lon);
		if(currentCoord in coordinates){
				console.log("Existe");
				var randomlat = (Math.random() * (0.001 - (-0.001)) + (-0.001));
				var randomlon = (Math.random() * (0.001 - (-0.001)) + (-0.001));
				console.log(randomlat);
				console.log(randomlon);
				data.destino.lat= data.destino.lat+randomlat;
				data.destino.lon=data.destino.lon+randomlon;
				console.log(coordinates);
				
			}
		setMarker(data);
		listMarker.push(data);

	}
	
	/*else{
		var lastKey;
		for(var key in markers){
		    if(markers.hasOwnProperty(key)){
		       lastKey = key;
		       break;
		    }
		}
		//lastKey = Object.keys(markers).reverse()[markers.length];
		map.removeLayer(markers[lastKey]);
		delete markers[lastKey];
		//alert(lastKey);
		setMarker(data);
	}*/
	connects[data.id] = data;
	connects[data.id].updated = $.now();


	
});


function setMarker(data) {
	//for (var i = 0; i < data.coords.length; i++) {
		if(data.tipoServicio!=9){
			var redMarker = L.AwesomeMarkers.icon({
			    icon: 'coffee',
			    markerColor: 'red'
			  });
			var marker = L.marker([data.destino.lat, data.destino.lon], { bounceOnAdd: true, bounceOnAddOptions: {duration: 500, height: 50}, icon: L.AwesomeMarkers.icon({icon: icons[data.tipoServicio -1], prefix: 'icon', markerColor: canal[data.canal -1], spin:false}) }).addTo(map);	

			coordinates[marker.getLatLng()] = data.id;
			
		//var marker = L.marker([data.coords[0].olat, data.coords[0].olng], { icon: yellowIcon}).addTo(map);
		marker.bindPopup('<p>¡Una venta aquí!<br>Usuario:<b>'+data.tipoServicio+'</b><br>Destino:['+data.destino.lat+','+data.destino.lon+']<br>' + '<a href="#" id="showRoute" data-coords=\'{"olat":"'+data.destino.lon+'","olng":"'+data.destino.lon+'","dlat":"'+data.destino.lon+'","dlng":"'+data.destino.lon+'"}\' onclick="drawPolyline();return false;" >Ver ruta</a></p> ');
		//
		markers[data.id] = marker;//tmp={olat:'+data.coords[0].olat+',olng:'+data.coords[0].olng+',dlat:'+data.coords[0].dlat+',dlng:'+data.coords[0].dlng+'}
		map.addLayer(markers[data.id]);
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
   					 console.log(layer._latlng);
   					 i=i+1;
				});
			markers[data.id] = circuito;
			map.addLayer(markers[data.id]);
			//alert("Circuito");
		}
		//var destmarker = L.marker([data.coords[0].dlat, data.coords[0].dlng], { icon: redIcon}).addTo(map);
	//}
}

function bar(data){
	//console.log(data.options.iconUrl);
	if(myControl.queue.length > 9){
    		myControl.queue.shift();
    	}
    	myControl.queue.push(data);
    	
    	tabla = '<div><nav class="navbar navbar-default"><div class="container-fluid"><div id="navbar" class="navbar-collapse collapse"><ul class="nav navbar-nav">';
    	for(var i=0; i<myControl.queue.length; i++){
    		tabla =  tabla + '<li><a href="#"><span class="icon icon-'+myControl.queue[i][0]+ ' canal-'+myControl.queue[i][1]+'"></span></a></li>';
    	}
    	tabla += '</ul></div></div></nav></div>';

    	//alert(tabla);
    	myControl._div.innerHTML = tabla;
    	
}


// elimina cada n tiempo el marcador que cumpla la condici
setInterval(function() {
	for (var ident in connects){
		if ($.now() - connects[ident].updated > tiempoMarcador) {
			delete connects[ident];
			delete coordinates[markers[ident].getLatLng()];
			map.removeLayer(markers[ident]);

		}
	}
}, tiempoMarcador);
