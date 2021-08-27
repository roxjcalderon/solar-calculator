import GoogleMapReact from 'google-map-react';
import React, { useState } from 'react';

import { drawingTool, searchComponent } from './googleMapComponents.js'
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

  const bootstrapURLKeys={
    key: apiKeys.google_api_key,
    libraries: ['drawing', 'places'].join(','),
  }


  // Input: map, maps component from Google
  const handleGoogleMapApi = (map, googleMaps) => {
    const drawingManager = drawingTool(map, googleMaps);
    searchComponent(map, googleMaps);
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
