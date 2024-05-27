// import React, { useState, useRef, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl'; 
// import 'mapbox-gl/dist/mapbox-gl.css';

// const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGpha2hhciIsImEiOiJjbHdtMDgzb24xbTNzMmtwZnU2cDFhdjFuIn0.arFOoaMg-lrHSQjfYwVebA'; // Replace with your Mapbox token

// mapboxgl.accessToken = MAPBOX_TOKEN;

// const MapComponent = () => {
//     const mapContainerRef = useRef(null);
  
//     useEffect(() => {
//       const map = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [-74.006, 40.7128], // Starting position [lng, lat]
//         zoom: 12, // Starting zoom
//       });
  
//       // Add navigation controls to the map
//       map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
//       // Cleanup on unmount
//       return () => map.remove();
//     }, []);
  
//     return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
//   };
  
//   export default MapComponent;


import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGpha2hhciIsImEiOiJjbHdtMDgzb24xbTNzMmtwZnU2cDFhdjFuIn0.arFOoaMg-lrHSQjfYwVebA'; // Replace with your Mapbox token

mapboxgl.accessToken = MAPBOX_TOKEN;

const MapComponent = ({ onSelectLocation, origin, destination }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128], // Starting position [lng, lat]
      zoom: 12, // Starting zoom
    });

    map.on('click', (event) => {
      const { lng, lat } = event.lngLat; // Corrected destructuring
      onSelectLocation({ latitude: lat, longitude: lng });
    });

    // Add navigation controls to the map
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup on unmount
    return () => map.remove();
  }, [onSelectLocation]);

  return (
    <div className="w-full h-96" ref={mapContainerRef}>
      {origin && (
        <div
          className="absolute z-10 bg-red-500 p-2 text-white rounded-full"
          style={{ top: `${origin.latitude}%`, left: `${origin.longitude}%` }}
        >
          O
        </div>
      )}
      {destination && (
        <div
          className="absolute z-10 bg-blue-500 p-2 text-white rounded-full"
          style={{ top: `${destination.latitude}%`, left: `${destination.longitude}%` }}
        >
          D
        </div>
      )}
    </div>
  );
};

export default MapComponent;
