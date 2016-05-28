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

L.geoJson(regions, {style: style}).addTo(map);
					