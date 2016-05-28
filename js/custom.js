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

	info.update(layer.feature.properties); // Update info box on hover

}

var geojson; // Make into a variable so we can reset the layar styles

function resetHighlight(e) {
	geojson.resetStyle(e.target);

	info.update(); // Update info box on hover

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

// Info box

var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Sheep Population 2015</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.population + ' sheep'
        : 'Hover over a region');
};

info.addTo(map);

// Legend

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'info legend'),
	    grades = [0, 50000, 100000, 200000, 500000, 1000000, 2000000, 3000000, 4000000, 5000000],
	    labels = [];

	// loop through our density intervals and generate a label with a colored square for each interval
	for (var i = 0; i < grades.length; i++) {
	    div.innerHTML +=
	        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
	        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
	}

  return div;

};

legend.addTo(map);