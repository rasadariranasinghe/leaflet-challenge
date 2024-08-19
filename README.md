# Earthquake Visualization with Leaflet

This project visualizes earthquake data using Leaflet, a popular JavaScript library for interactive maps. The map displays earthquakes from a dataset provided by the USGS, plotting each earthquake based on its longitude and latitude. The size and color of the markers reflect the earthquake's magnitude and depth, respectively.

## Project Overview

- **Objective**: Visualize earthquake data with interactive markers and a legend using Leaflet.
- **Data Source**: USGS GeoJSON Feed
- **Features**:
  - Markers indicate the location of earthquakes.
  - Marker size represents the magnitude of the earthquake.
  - Marker color represents the depth of the earthquake.
  - Popups provide additional details about each earthquake.
  - A legend explains the color and size scales used for visualization.

## Getting Started

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript.
- Leaflet library for map visualization.

### Installation

1. **Clone the repository** (or create a new directory for your project) and navigate to the project directory.
2. **Include Leaflet in your HTML**: Add the Leaflet CSS and JavaScript libraries to your HTML file.
3. **Create a JavaScript file** to handle the map creation and data visualization.
4. **Add the necessary HTML structure** to include a map container.
5. **Fetch the earthquake data** from the USGS GeoJSON Feed and process it for visualization.
6. **Configure the Leaflet map**: Set up the map view, add markers, and configure popups and legends.

## Usage

1. Open the HTML file in a web browser to view the map with earthquake data.
2. Interact with the map by clicking on markers to view details about each earthquake.
3. Use the legend to understand the color and size scales representing earthquake depth and magnitude.

## Data Source

- [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)


## Acknowledgments

- Leaflet library: [Leaflet](https://leafletjs.com/)
- USGS for providing the earthquake data.
