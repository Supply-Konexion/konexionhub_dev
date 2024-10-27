// Importaciones de librerías y componentes necesarios
import React, { useState } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

import GoogleMapReact from "google-map-react";
import { LocationOn } from "@mui/icons-material";

// Estilos para el marcador en el mapa
const markerStyle = {
  position: "absolute",
  top: "100%",
  left: "50%",
  width: 40,
  height: 50,
  transform: "translate(-50%, -100%)",
  color: "#d32f2f",
};

// Componente principal para guardar el mapa
export default function SaveMap(props) {
  const { keyMapGoogle } = React.useContext(UrlServicesContext);

  // Estado para el marcador
  const [marker, setMarker] = useState({
    lat: props.lt,
    lng: props.lg,
  });

  // Propiedades por defecto del mapa
  const defaultProps = {
    center: {
      lat: props.lt,
      lng: props.lg,
    },
  };

  // Manejar el clic en el mapa
  const handleMapClick = ({ lat, lng }) => {
    setMarker({ lat, lng });
    // Aquí puedes realizar más acciones, como guardar la ubicación
    props.dataLocation({ lat, lng });
    // console.log("Ubicación marcada:", { lat, lng });
  };

  return (
    // Importante! Siempre establecer la altura del contenedor explícitamente
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: keyMapGoogle }} // Asegúrate de poner tu clave API
        defaultCenter={defaultProps.center}
        zoom={parseInt(props.zoom)}
        onClick={handleMapClick} // Agregar el evento de clic
      >
        <div lat={marker.lat} lng={marker.lng}>
          <LocationOn sx={markerStyle} />
        </div>
      </GoogleMapReact>
    </div>
  );
}