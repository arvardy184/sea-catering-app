'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

interface MapProps {
  height?: string;
  center?: [number, number];
  zoom?: number;
  markerPosition?: [number, number];
  markerText?: string;
}

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Create a separate component for the actual map content
const MapContent: React.FC<MapProps> = ({
  height = "256px",
  center = [-6.3703237, 106.8244792], // Jakarta coordinates
  zoom = 12,
  markerPosition = [-6.3703237, 106.8244792],
  markerText = "SEA Catering - Jakarta Selatan"
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Import Leaflet CSS and configure icons only on client side
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(link);
    
    import('leaflet').then((L) => {
      // Fix for default markers in React Leaflet
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return (
      <div 
        className="bg-gray-100 rounded-2xl flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPosition}>
          <Popup>
            <div className="text-center">
              <strong>{markerText}</strong>
              <br />
              Melayani area Jakarta dan sekitarnya
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

// Dynamic import the MapContent component with no SSR
const DynamicMap = dynamic(() => Promise.resolve(MapContent), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-100 rounded-2xl flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-gray-500 text-sm">Loading map...</p>
      </div>
    </div>
  )
});

export const Map: React.FC<MapProps> = (props) => {
  return <DynamicMap {...props} />;
}; 