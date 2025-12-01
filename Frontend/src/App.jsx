import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import MapCilandakTimur from "./CilandakTimur";
import Footer from "./Components/Footer";

function FlyToUser({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 18); // zoom dan pindah ke lokasi user
  }, [coords]);
  return null;
}

function MapView() {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error(err)
      );
    }
  }, []);
  const defaultCenter = [-6.2, 106.816666];

  return (
    <MapContainer
      center={coords || defaultCenter} // default Jakarta
      zoom={coords ? 20 : 15}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {coords && (
        <>
          <Marker position={coords}>
            <Popup>📍 Anda di sini</Popup>
          </Marker>
          <FlyToUser coords={coords} />
        </>
      )}
    </MapContainer>
  );
}

export default function App() {
  return (
    <div className="">
      <h1>Hello, World!</h1>
      <div className="width-[200px]">{/* <MapCilandakTimur /> */}</div>
      <Footer />
    </div>
  );
}
