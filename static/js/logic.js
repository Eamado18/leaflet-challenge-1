
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

d3.json(queryUrl).then(function (data) {
    createFeatures(data.features);
}); 


function createFeatures(earthquakeData) {
    

    function onEachFeature(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + " Location and Depth: " + feature.properties.place); 
    } 
    
    function customcolor () {
       if (depth < 11)
         customcolor = "blue";
       else if (depth < 31)
       customcolor = "green";
       else if (feature.geometry.coordinates[3] < 51)
       customcolor = "yellow";
       else if (feature.geometry.coordinates[3] < 71)
       customcolor = "orange";
       else if (feature.geometry.coordinates[3] < 91)
       customcolor = "aqua";
       return customcolor
    }

    var earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function(feature, latlng) {
          return new L.CircleMarker(latlng, {
             color: "red",
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
var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Categories</strong>'],
    categories = ['Road Surface','Signage','Line Markings','Roadside Hazards','Other'];

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(myMap);


