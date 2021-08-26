import GoogleMap from 'google-map-react';
import React, { useState } from 'react';

function Map(api_keys) {
  const defaultProps = {
    center: {
      lat: 39.099728,
      lng: -94.578568
    },
    zoom: 11
  };

  const bootstrapURLKeys={
    key: api_keys.google_api_key
  }

  const handleGoogleMapApi = (map, googleMaps) => {
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
    </div>
  );
}

export default Map;
