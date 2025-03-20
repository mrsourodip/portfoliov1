import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

interface MapComponentProps {
  isDarkMode?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ isDarkMode }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Kolkata coordinates
    const kolkata = { lng: 88.3639, lat: 22.5726 };

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: isDarkMode 
        ? `https://api.maptiler.com/maps/night/style.json?key=${mapApiKey}`
        : `https://api.maptiler.com/maps/bright/style.json?key=${mapApiKey}`,
      center: [kolkata.lng, kolkata.lat],
      zoom: 11
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add marker for Kolkata
    new maplibregl.Marker({ color: isDarkMode ? '#ffffff' : '#FF0000' })
      .setLngLat([kolkata.lng, kolkata.lat])
      .addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map style when dark mode changes
  useEffect(() => {
    if (map.current) {
      map.current.setStyle(
        isDarkMode 
          ? `https://api.maptiler.com/maps/night/style.json?key=${mapApiKey}`
          : `https://api.maptiler.com/maps/bright/style.json?key=${mapApiKey}`
      );
    }
  }, [isDarkMode]);

  return <div ref={mapContainer} className="map-container" />;
};

export default MapComponent; 