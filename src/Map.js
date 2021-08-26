import GoogleMap from 'google-map-react';
import React, { useState } from 'react';
import { drawingTool } from './googleMapComponents.js'
import { calculateNominalPower } from './nominalPowerCalculation.js'

function Map(api_keys) {
  const defaultProps = {
    center: {
      lat: 39.099728,
      lng: -94.578568
    },
    zoom: 11
  };

  const bootstrapURLKeys={
    key: api_keys.google_api_key,
    libraries: ['drawing'].join(','),
  }


  const [area, setArea] = useState(0);
  const [power, setPower] = useState("");

  const handleGoogleMapApi = (map, googleMaps) => {
    const drawingManager = drawingTool(map, googleMaps);

    // Resource Used: // https://developers.google.com/maps/documentation/javascript/reference/geometry#spherical
    googleMaps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
      const area = googleMaps.geometry.spherical.computeArea(polygon.getPath());
      setArea(area);
    });
  }

  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <GoogleMap
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleGoogleMapApi(map, maps)}
      >
      </GoogleMap>
      Area Selected: {area} sq meters
      <br/>

      { calculateNominalPower(area) }
    </div>
  );
}

export default Map;
