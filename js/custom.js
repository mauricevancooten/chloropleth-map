var map = L.map('map').setView([-40.966, 172.763], 5);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Colours

function getColor(d) {
  return d > 5000000 ? '#e920dd' :
  			 d > 4000000 ? '#ec45e2' :
  			 d > 3000000 ? '#ee57e5' :
         d > 2000000 ? '#f06ae8' :
         d > 1000000 ? '#F27CEB' :
         d > 500000 ? '#F48FEE' :
         d > 200000 ? '#F5A2F0' :
         d > 100000 ? '#F7B4F3' :
         d > 50000  ? '#FBD9F9' :
                    '#FDECFC';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.population),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Interaction

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
	    weight: 5,
	    color: '#666',
	    dashArray: '',
	    fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
	    layer.bringToFront();
	}

}

var geojson; // Make into a variable so we can reset the layar styles

function resetHighlight(e) {
	geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

// Event handlers

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}
		
geojson = L.geoJson(regions, {
	style: style,
	onEachFeature: onEachFeature // Add listener to our region layers
}).addTo(map);