import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

// helper centroid sederhana untuk Polygon / MultiPolygon geojson
function getCentroid(geom) {
  if (!geom || !geom.coordinates) return null;
  const type = geom.type;
  const getRingPoints = (coords) => coords[0] || coords; // first ring
  let points = [];
  if (type === "Polygon") {
    points = getRingPoints(geom.coordinates);
  } else if (type === "MultiPolygon") {
    // pilih polygon pertama
    points = getRingPoints(geom.coordinates[0] || []);
  } else {
    return null;
  }
  if (!points.length) return null;
  let sumX = 0,
    sumY = 0;
  points.forEach((p) => {
    const lng = p[0];
    const lat = p[1];
    sumX += lng;
    sumY += lat;
  });
  const avgLng = sumX / points.length;
  const avgLat = sumY / points.length;
  return [avgLat, avgLng];
}

export default function MapCilandakTimur() {
  const [geoData, setGeoData] = useState(null);
  const [rtFeatures, setRtFeatures] = useState([]);
  const [kelurahanCentroid, setKelurahanCentroid] = useState(null);
  const [rwRtData, setRwRtData] = useState({}); // State baru untuk RW & RT
  const coordinatesCilandakTimur = [-6.2935482, 106.8105496];
  useEffect(() => {
    fetch("/CilandakTimur.json")
      .then((res) => res.json())
      .then((data) => {
        const feature = data[0];
        setGeoData(feature.geojson);

        const c = getCentroid(feature.geojson);
        if (c) setKelurahanCentroid(c);

        // Extract RW dan RT
        if (feature.RW_filtered && feature.RW_filtered.coordinates) {
          const rwData = {};
          Object.keys(feature.RW_filtered.coordinates).forEach((rw) => {
            const rtList = feature.RW_filtered.coordinates[rw];
            rwData[rw] = rtList
              .map((rt) => rt.properties?.WADMRT)
              .filter(Boolean);
          });
          setRwRtData(rwData);
          console.log("RW & RT Data:", rwData);
        }

        if (feature.RW_filtered && feature.RW_filtered.coordinates) {
          const rtArray = Object.values(feature.RW_filtered.coordinates).flat();
          setRtFeatures(rtArray);
        }
      })
      .catch((err) => console.error("Error fetching GeoJSON:", err));
  }, []);

  console.log("RT Features:", rtFeatures);

  const defaultCenter = [-6.2920769, 106.8112826]; // koordinat Cilandak Timur

  return (
    <>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: "1000px", width: "1400px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
            <Marker position={coordinatesCilandakTimur}>
              <Popup>📍 Cilandak Timur</Popup>
            </Marker>

            {/* Render setiap RT */}
            {rtFeatures.map((rtFeature, idx) => {
              const rtLabel = rtFeature.properties?.WADMRT || `RT ${idx}`;
              const rwLabel = rtFeature.properties?.WADMRW || "?";

              if (rtFeature.geometry) {
                return (
                  <GeoJSON
                    key={`rt-${rtLabel}-${idx}`}
                    data={rtFeature}
                    style={{
                      color: "#ff6b6b",
                      weight: 1.5,
                      fillOpacity: 0.2,
                      dashArray: "5, 5",
                    }}
                    onEachFeature={(feature, layer) => {
                      const popupContent = `
                        <div style="font-family: Arial; font-size: 12px;">
                          <strong style="color: #0066cc; font-size: 14px;">📍 Informasi</strong>
                          <p style="margin: 8px 0 4px 0;"><strong>RW:</strong> ${rwLabel}</p>
                          <p style="margin: 4px 0;"><strong>RT:</strong> ${rtLabel}</p>
                          <p style="margin: 4px 0; font-size: 11px; color: #666;">Kelurahan: Cilandak Timur</p>
                        </div>
                      `;
                      layer.bindPopup(popupContent);
                    }}
                  />
                );
              }

              return kelurahanCentroid ? (
                <Marker
                  key={`rt-marker-${rtLabel}-${idx}`}
                  position={kelurahanCentroid}
                >
                  <Popup>
                    <div style="font-family: Arial; font-size: 12px;">
                      <strong style="color: #0066cc; font-size: 14px;">
                        📍 Informasi
                      </strong>
                      <p style="margin: 8px 0 4px 0;">
                        <strong>RW:</strong> {rwLabel}
                      </p>
                      <p style="margin: 4px 0;">
                        <strong>RT:</strong> {rtLabel}
                      </p>
                      <p style="margin: 4px 0; font-size: 11px; color: #666;">
                        Kelurahan: Cilandak Timur
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ) : null;
            })}
          </>
        )}
      </MapContainer>
    </>
  );
}
