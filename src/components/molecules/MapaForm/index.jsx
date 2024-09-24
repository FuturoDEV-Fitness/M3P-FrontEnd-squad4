/* eslint-disable */
import { Grid } from "@mui/material";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";

function MapaForm(dadosLocal) {
 const mapConfig = {
  lat: dadosLocal.latitude,
  lng: dadosLocal.longitude,
  zoom: 10
 };

 return (
  <Grid className="containerMapa">
   // Create a map instance and set the initial view coordinates and zoom level
   <MapContainer
    center={[mapConfig.lat, mapConfig.lng]}
    zoom={mapConfig.zoom}
    style={{ height: "400px" }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[mapConfig.lat, mapConfig.lng]}>
     <Popup>A popup message on the marker.</Popup>
    </Marker>
   </MapContainer>
  </Grid>
 );
}

export default MapaForm;
