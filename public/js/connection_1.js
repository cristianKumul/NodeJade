var connects = {};
var markers = {};
var currentDest;
var	markerDest ={};

socket.on('oldcoords',function(data) {
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

/*map.on('click', function(e) {
   console.log("{lat:" + e.latlng.lat + ",lon:" + e.latlng.lng+"},")
});*/