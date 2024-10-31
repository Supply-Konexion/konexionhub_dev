import React from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import GoogleMapReact from "google-map-react";
import { LocationOn } from "@mui/icons-material";

const markerStyle = {
  position: "absolute",
  top: "100%",
  left: "50%",
  width: 40,
  height: 50,
  transform: "translate(-50%, -100%)",
  color: "#d32f2f",
};

export default function MapPublic(props) {
  const { keyMapGoogle } = React.useContext(UrlServicesContext);

  const defaultProps = {
    center: {
      lat: props.lt,
      lng: props.lg,
    },
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: keyMapGoogle }}
        defaultCenter={defaultProps.center}
        zoom={parseInt(props.zoom)}
      >
        <div lat={props.lt} lng={props.lg}>
          <LocationOn sx={markerStyle} />
        </div>
      </GoogleMapReact>
    </div>
  );
}
