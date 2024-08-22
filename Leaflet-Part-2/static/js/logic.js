
// Define a function to determine marker color based on depth
function markerColor(depth) {
  return depth > 90 ? "#ff5f65" :
    depth > 70 ? "#fca35d" :
      depth > 50 ? "#fdb72a" :
        depth > 30 ? "#f7db11" :
          depth > 10 ? "#a3f600" :
            depth > -10 ? "#dcf400" :
              "#98ee00";
}

  // Create baseMaps object
  let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  let satelliteMap = L.tileLayer('https://{s}.googleapis.com/maps/vt?lyrs=s&x={x}&y={y}&z={z}', {
      attribution: '&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google Maps</a>'
  })
  let grayscaleMap =L.tileLayer('https://{s}.stamen.com/toner/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="https://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  });

  
// Initialize the map
let map = L.map("map", {
  center: [30.09, -52.71],
  zoom: 3,
  layers: streetMap
});

// Fetch the earthquake data
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl).then(function (data) {
  // Create a GeoJSON layer for earthquake data
  let earthquakeData = L.geoJson(data, {
    pointToLayer: function (geoJsonPoint, latlng) {
      return L.circleMarker(latlng, {
        radius: geoJsonPoint.properties.mag * 5,
        fillColor: markerColor(geoJsonPoint.geometry.coordinates[2]),
        color: "black",
        weight: 1,
        fillOpacity: 0.75
      });
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p> <h4>Magnitude: ${feature.properties.mag}</h4><hr><h4>Depth: ${feature.geometry.coordinates[2]}</h4>`);
    }
  }).addTo(map);

  // Fetch the Tectonic Plates data
  d3.json("static/data/data.json").then(function (tectonicData) {
    // Create a GeoJSON layer for tectonic plates
    let techtonicData = L.geoJson(tectonicData, {
      style: function () {
        return { color: "yellow", weight: 2 };
      }
    }).addTo(map);

    // Create baseMaps object

  let baseMaps ={
    'Satellite' : satelliteMap,
    'Grayscale' : grayscaleMap,
    'Outdoors' : streetMap
  };
    
    // Create overlayMaps object
    let overlayMaps = {
      "Tectonic Plates": techtonicData,
      "Earthquakes": earthquakeData
    };

    // Add control layers
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

    // Add a legend to the map
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
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

    legend.addTo(map);

  }).catch(error => {
    console.error('Error fetching tectonic data:', error);
  });

}).catch(error => {
  console.error('Error fetching earthquake data:', error);
});

