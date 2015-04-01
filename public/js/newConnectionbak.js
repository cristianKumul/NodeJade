var connects = {};
var markers = {};
var currentDest;
var	markerDest ={};
var listMarker=[],last;
var markerId;
/*socket.on('oldcoords',function(data) {
	// body...
	
	for (var i = 0; i < data.length; i++) {
		setMarker(data[i]);
	}

});*/
var redIcon = new tinyIcon({ iconUrl: '../assets/marker-red.png' });
var yellowIcon = new tinyIcon({ iconUrl: '../assets/marker-yellow.png' });
var blueIcon = new tinyIcon({iconUrl:'../assets/marker-blue.png'});


var icons=['hotels','transfers','flights','tours','cars','packages','buses','cruises','circuits'],
	canal=['propias','terceros','corporativo'],
	colorcanal=['#f04276','#007F16','#00365B'];

/*icons.push(L.AwesomeMarkers.icon({
    icon: 'coffee',
    markerColor: 'red'
  }),
L.AwesomeMarkers.icon({
    icon: '\e610',
    markerColor: 'red'
  }),
L.AwesomeMarkers.icon({
    icon: '\e610',
    markerColor: 'red'
  }),
L.AwesomeMarkers.icon({
    icon: '\e610',
    markerColor: 'red'
  }),
L.AwesomeMarkers.icon({
    icon: '\e610',
    markerColor: 'red'
  }),
L.AwesomeMarkers.icon({
    icon: '\e610',
    markerColor: 'red'
  }),
  L.AwesomeMarkers.icon({
    icon: '\e610',
    markerColor: 'red'
  }),
  L.AwesomeMarkers.icon({
    icon: '\e610',
    markerColor: 'red'
  }),
  L.AwesomeMarkers.icon({
    icon: '\e610',
    markerColor: 'red'
  }));*/
socket.on('load:coords', function(data) {
	var n = Object.keys(markers).length;
	//alert(n);
	markerId = Math.random().toString(16).substring(2,15);
	if (!(markerId in markers) &&  n < 10) {
		setMarker(data);
		listMarker.push(data);

	}
	else{
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
	}

	
});


function setMarker(data) {
	//for (var i = 0; i < data.coords.length; i++) {
		if(data.tipoServicio!=9){
			var redMarker = L.AwesomeMarkers.icon({
			    icon: 'coffee',
			    markerColor: 'red'
			  });
			var marker = L.marker([data.destino.lat, data.destino.lon], { icon: L.AwesomeMarkers.icon({icon: icons[data.tipoServicio -1], prefix: 'icon', markerColor: 'canal-'+canal[data.canal -1], spin:false}) }).addTo(map);	
		
		//var marker = L.marker([data.coords[0].olat, data.coords[0].olng], { icon: yellowIcon}).addTo(map);
		marker.bindPopup('<p>¡Una venta aquí!<br>Usuario:<b>'+data.tipoServicio+'</b><br>Destino:['+data.destino.lat+','+data.destino.lon+']<br>' + '<a href="#" id="showRoute" data-coords=\'{"olat":"'+data.destino.lon+'","olng":"'+data.destino.lon+'","dlat":"'+data.destino.lon+'","dlng":"'+data.destino.lon+'"}\' onclick="drawPolyline();return false;" >Ver ruta</a></p> ', (data.canal== 1 ? {className:'popup-canal1'}:data.canal== 2 ? {className:'popup-canal2'}:{className:'popup-canal3'}));
		//
		markers[markerId] = marker;//tmp={olat:'+data.coords[0].olat+',olng:'+data.coords[0].olng+',dlat:'+data.coords[0].dlat+',dlng:'+data.coords[0].dlng+'}
		map.addLayer(markers[markerId]);
		bar([icons[data.tipoServicio -1],canal[data.canal -1]]);
		}
		else{
			var marker2 = L.marker([data.destino[0].lon, data.destino[0].lat], { icon: L.AwesomeMarkers.icon({icon: icons[data.tipoServicio -1], prefix: 'icon', markerColor: colorcanal[data.canal -1], spin:false}) }).addTo(map);
			marker2.bindPopup('<p>¡Una venta aquí!<br>Usuario:<b>'+data.tipoServicio+'</b><br>Destino:['+data.destino.lat+','+data.destino.lon+']<br>' + '<a href="#" id="showRoute" data-coords=\'{"olat":"'+data.destino.lon+'","olng":"'+data.destino.lon+'","dlat":"'+data.destino.lon+'","dlng":"'+data.destino.lon+'"}\' onclick="drawPolyline();return false;" >Ver ruta</a></p> ', (data.canal== 1 ? {className:'popup-canal1'}:data.canal== 2 ? {className:'popup-canal2'}:{className:'popup-canal3'}));
			bar([icons[data.tipoServicio -1],canal[data.canal -1]]);
			var circuito = L.layerGroup([marker2]);
			var latlngs = [L.latLng(data.destino[0].lon, data.destino[0].lat)];
			for (var i = 1; i < data.destino.length; i++) {
				var marker = L.marker([data.destino[i].lon, data.destino[i].lat], { icon: L.AwesomeMarkers.icon({icon: icons[data.tipoServicio -1], prefix: 'icon', markerColor: 'canal-'+canal[data.canal -1], spin:false}) }).addTo(map);
				circuito.addLayer(marker);
				
			}
			var i = 1;
			circuito.eachLayer(function (layer) {
   					 layer.bindPopup("Circuito: Día "+i);
   					 latlngs.push(layer._latlng);
   					 foo = [latlngs[i-1],latlngs[i]]
   					 var polyline = L.polyline(foo, {color: colorcanal[data.canal -1] });
   					 circuito.addLayer(polyline);
   					 console.log(layer._latlng);
   					 i=i+1;
				});
			markers[markerId] = circuito;
			map.addLayer(markers[markerId]);
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
    		//tabla =  tabla + '<li><a href="#"><span class="icon icon-'+myControl.queue[i][0]+ ' canal-'+myControl.queue[i][1]+'"></span></a></li>';
    		tabla =  tabla + '<li><a href="#"><span class="icon icon-cars canal-propias"></span></a></li>';
    		
    		console.log(myControl.queue[i]);
    	}
    	tabla += '</ul></div></div></nav></div>';

    	//alert(tabla);
    	myControl._div.innerHTML = tabla;
    	//alert(myControl._div.innerHTML);
    	//var inner = myControl.getContainer().innerHTML;
        //alert(myControl.getContainer().innerHTML);
}
