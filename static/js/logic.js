
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

d3.json(queryUrl).then(function (data) {
    createFeatures(data.features);
    
}); 


function getColor(d) {
  return d > 90 ? '#BD0026' :
         d < 91  ? '#E31A1C' :
         d < 71  ? '#FC4E2A' :
         d < 51   ? '#FD8D3C' :
         d < 31  ? '#FEB24C' :
         d < 11   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: getColor(geometry.coordinates[3]),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function createFeatures(earthquakeData) {
    

    function onEachFeature(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + " Location and Depth: " + feature.properties.place); 
    } 
    
    
  
    var earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function(feature, latlng) {
          return new L.CircleMarker(latlng, {
            style: style,
             radius: Math.exp(feature.properties.mag)/15
          });
      },
      onEachFeature: onEachFeature
    });

 createMap(earthquakes);
}

function createMap(earthquakes) {

  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  })

 
  var baseMaps = {
    "Street Map": street,
    "Terrain Map": terrain
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });


  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}





