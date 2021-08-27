import GoogleMapReact from 'google-map-react';
import React, { useState } from 'react';
import './Map.css';

import { drawingTool } from './googleMapComponents.js'
import { calculateNominalPower } from './nominalPowerCalculation.js'

// Input: Take in API keys stored in ENV.
function Map(apiKeys) {
  const defaultProps = {
    center: {
      lat: 39.099728,
      lng: -94.578568
    },
    zoom: 11
  };

  const [area, setArea] = useState(0);
  const [map, setMap] = useState(null);
  const [mapAPIRendered, setMapAPIRendered] = useState(false);

  const [googleMaps, setGoogleMaps] = useState(null);

  const bootstrapURLKeys={
    key: apiKeys.google_api_key,
    libraries: ['drawing', 'places'].join(','),
  }


  // Input: map, maps component from Google
  const handleGoogleMapApi = (map, googleMaps) => {
    if (map && googleMaps && !mapAPIRendered){
      setMap(map)
      setGoogleMaps(googleMaps)
      setMapAPIRendered(true)
    }

    const drawingManager = drawingTool(map, googleMaps);

    // https://developers.google.com/maps/documentation/javascript/examples/places-searchbox#maps_places_searchbox-javascript
    // the following code is pilfered almost directly from above. But who writes google code better than google?
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

    // Resource Used: https://developers.google.com/maps/documentation/javascript/reference/geometry#spherical
    googleMaps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
      const area = googleMaps.geometry.spherical.computeArea(polygon.getPath());
      setArea(area);
    });

  }

  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleGoogleMapApi(map, maps)}
      >
        <input id="pac-input" className="controls"/>

      </ GoogleMapReact>

      <br/>
      { calculateNominalPower(area) }
    </div>
  );
}

export default Map;
