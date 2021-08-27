// Input: map, maps component from Google API
// Return: Google's drawing manager
export const drawingTool = (map, googleMaps) => {
  //Resources:
  // https://github.com/google-map-react/google-map-react/issues/102
  const drawingManager = new googleMaps.drawing.DrawingManager({
    drawingMode: googleMaps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: googleMaps.ControlPosition.TOP_CENTER,
      drawingModes: [
        googleMaps.drawing.OverlayType.POLYGON,
      ],
    },
  });
  drawingManager.setMap(map);
  return drawingManager;
};

// Input: map, maps component from Google API
// Objective: Set up the search component of google maps.
export const searchComponent = (map, googleMaps) => {
  // https://developers.google.com/maps/documentation/javascript/examples/places-searchbox#maps_places_searchbox-javascript
  // the following code is very closely adapted to the search box functionality above.
  const input = document.getElementById("pac-input");
  const searchBox = new googleMaps.places.SearchBox(input);
  map.controls[googleMaps.ControlPosition.TOP_LEFT].push(input);

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    const bounds = new googleMaps.LatLngBounds();
    places.forEach((place) => {
      if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
    });
   map.fitBounds(bounds);
  });
};
