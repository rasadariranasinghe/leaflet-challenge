//Create the map object
let myMap = L.map("map", {
    center: [48, -82.71], 
    zoom: 3
  });
  
  // Add the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
// Use d3 to read the JSON file.
// The data from the JSON file is arbitrarily named importedData as the argument.
d3.json("data/data.json").then((importedData) => {
  
  let data = importedData;


let basemaps ={
  
}


  // Define a function to determine marker color based on depth
  function markerColor(depth) {
    return depth > 90 ? "#ff5f65" :
           depth > 70 ? "#fca35d" :
           depth > 50 ? "#fdb72a" :
           depth > 30 ? "#f7db11" :
           depth > 10 ? "#a3f600":
           depth > -10 ? "#dcf400" :
                        "#98ee00";
  }

  // Fetch the earthquake data
  let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  
  d3.json(queryUrl).then(function(data) {
    
    // Step 5: Create a GeoJSON layer
  L.geoJson(data, {
    // Turn each feature into a circle marker
    pointToLayer: function(geoJsonPoint, latlng) {
      return L.circleMarker(latlng, {
        radius: geoJsonPoint.properties.mag*3,
        fillColor: markerColor(geoJsonPoint.geometry.coordinates[2]),
        color: "black",
        weight: 1,
        fillOpacity: 0.75
      });
    },
      // Bind popups to each marker
      onEachFeature: function(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
      }
    }).addTo(myMap);
  
    // Add a legend to the map
    let legend = L.control({ position: "bottomright" });
  
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      let grades = [-10, 10, 30, 50, 70, 90];
      let colors = ["#a3f600", "#dcf400", "#f7db11", "#fdb72a", "#fca35d", "#ff5f65"];
      let labels = [];
  
      div.innerHTML = "<h4>Depth (km)</h4>";
  
      // Loop through the depth intervals to generate a label with a colored square for each interval
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + colors[i] + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
    };
  
    legend.addTo(myMap);
  
  });
  