var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

d3.json(queryUrl).then(function (data) {
    console.log(data.features)
}); 