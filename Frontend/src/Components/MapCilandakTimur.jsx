import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

export default function MapCilandakTimur() {
  const [geoData, setGeoData] = useState(null);
  const coordinatesCilandakTimur = [-6.2935482, 106.8105496];

  useEffect(() => {
    fetch("/CilandakTimur.json")
      .then((res) => res.json())
      .then((data) => {
        const feature = data[0];
        setGeoData(feature.geojson);
      })
      .catch((err) => console.error("Error fetching GeoJSON:", err));
  }, []);

  const defaultCenter = [-6.2920769, 106.8112826];

  return (
    <>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {geoData && (
          <>
            <GeoJSON
              data={{
                type: "Feature",
                geometry: geoData,
                properties: {},
              }}
              style={{
                color: "blue",
                weight: 2,
                fillOpacity: 0.3,
              }}
            />
          </>
        )}
      </MapContainer>
    </>
  );
}
