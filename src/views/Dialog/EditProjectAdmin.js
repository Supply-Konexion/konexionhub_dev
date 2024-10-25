import React, { useState, useCallback } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";
import debounce from "lodash.debounce";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  AddCircle,
  Delete,
  CloudUpload,
  Videocam,
  GasMeter,
  Campaign,
  Deck,
  EnergySavingsLeaf,
  FitnessCenter,
  LocalFlorist,
  HotTub,
  InvertColors,
  LineStyle,
  OutdoorGrill,
  Pets,
  Pool,
  RunCircle,
  Security,
  SettingsRemote,
  VerticalShades,
  SelfImprovement,
  LocalMovies,
  SportsEsports,
  SportsSoccer,
  SportsTennis,
  DirectionsWalk,
  WifiPassword,
  SolarPower,
  Water,
  BusinessCenter,
  Close,
  Save,
  VisibilityOff,
  Visibility,
} from "@mui/icons-material";
import {
  Grid,
  Card,
  TextField,
  Button,
  ImageListItem,
  Checkbox,
  Alert,
  Slide,
  Snackbar,
  FormHelperText,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import LoadTypeProperty from "components/Services/LoadTypeProperty";
import LoadCountries from "components/Services/LoadCountries";
import LoadStates from "components/Services/LoadStates";
import LoadCities from "components/Services/LoadCities";
import SaveMap from "views/Maps/SaveMap.js";
import noimage from "assets/img/noimage.jpeg";
import loading from "assets/img/loading.gif";

import { cardBodyStyle, ParagraphTextPage } from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const items = [
  { id: 1, icon: <Videocam />, label: "Seguridad" },
  { id: 2, icon: <GasMeter />, label: "Gas directo" },
  { id: 3, icon: <Campaign />, label: "Alarmas" },
  { id: 4, icon: <Deck />, label: "Área comunal" },
  { id: 5, icon: <EnergySavingsLeaf />, label: "Energía renovable" },
  { id: 6, icon: <FitnessCenter />, label: "Gimnasio" },
  { id: 7, icon: <LocalFlorist />, label: "Área verdes" },
  { id: 8, icon: <HotTub />, label: "Jacuzzi" },
  { id: 9, icon: <InvertColors />, label: "Agua fría y caliente" },
  { id: 10, icon: <LineStyle />, label: "Acabados de lujo" },
  { id: 11, icon: <OutdoorGrill />, label: "BBQ patio" },
  { id: 12, icon: <Pets />, label: "Pet friendly" },
  { id: 13, icon: <Pool />, label: "Piscina" },
  { id: 14, icon: <RunCircle />, label: "Salidas de emergencias" },
  { id: 15, icon: <Security />, label: "Guardia de seguridad" },
  { id: 16, icon: <SettingsRemote />, label: "Accesos remotos" },
  { id: 17, icon: <SolarPower />, label: "Paneles solares" },
  { id: 18, icon: <VerticalShades />, label: "Ascensores" },
  { id: 19, icon: <WifiPassword />, label: "Acceso a internet" },
  { id: 20, icon: <DirectionsWalk />, label: "Caminerías" },
  { id: 21, icon: <SportsTennis />, label: "Canchas de raquetas" },
  { id: 22, icon: <SportsSoccer />, label: "Canchas de futbol" },
  { id: 23, icon: <SportsEsports />, label: "Salon de juegos" },
  { id: 24, icon: <LocalMovies />, label: "Sala de cines" },
  { id: 25, icon: <SelfImprovement />, label: "Spa room" },
  { id: 26, icon: <Water />, label: "Lagos" },
  { id: 27, icon: <BusinessCenter />, label: "Coworking" },
];

const StyledTableRow = styled(TableRow)({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#FAFAFA",
    },
  },
});

export default function EditProjectAdmin(props) {
  const classes = useStyles();

  const [returnLogin, setReturnLogin] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [mensageSystem, setMensageSystem] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const [loaders, setLoaders] = React.useState(false);
  const [selectedItems, setSelectedItems] = useState(props.id.row.services);
  const [dataImageSlider, setDataImageSlider] = useState(props.id.row.images);
  const [informationPlans, setInformationPlans] = useState(props.id.row.planos);
  const [alert, setAlert] = React.useState({
    openAlert: false,
    errorAlert: "error",
    mensaje: "",
  });

  const { urlServices, UserAuth } = React.useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [values, setValues] = React.useState({
    constructor: props.id.row.constructora,
    whatsApp: props.id.row.phone,
    headerImage: props.id.row.headerImage,
    planImage: null,
    description: props.id.row.description,
    linkYouTube: props.id.row.linkYoutube,
    typeProperty: "",
    typePropertyData: "",
    rooms: "",
    bathrooms: "",
    halfBathrooms: "",
    serviceRoom: "",
    livingRoom: "",
    warehouse: "",
    parking: "",
    area: "",
    price: "",
    sectionPlan: props.id.row.viewPlanos === 1 ? true : false,
    sectionLocation: props.id.row.viewLocation === 1 ? true : false,
    countries: props.id.row.countriesId,
    countriesData: {
      id: props.id.row.countriesId,
      name: props.id.row.countries?.name,
    },
    states: props.id.row.statesId,
    statesData: { id: props.id.row.statesId, name: props.id.row.states?.name },
    city: props.id.row.cityId,
    cityData: { id: props.id.row.cityId, name: props.id.row.cities?.name },
    disabledStates: false,
    disabledCity: false,
    descriptionLocation: props.id.row.descriptionLocation,
    latidude: props.id.row.ltLgLocation.lt,
    longitude: props.id.row.ltLgLocation.lg,
    errorContructor: false,
    errorWhatsApp: false,
    errorDescription: false,
    errorTypeProperty: false,
    errorRooms: false,
    errorBathrooms: false,
    errorParking: false,
    errorArea: false,
    errorPrice: false,
    errorCountries: false,
    errorStates: false,
    errorCity: false,
    errorDescriptionLocation: false,
  });

  const changeTypeProperty = (data) => {
    setValues({
      ...values,
      typeProperty: data !== null ? { id: data.id, name: data.name } : "",
      typePropertyData: data !== null ? data : "",
      errorTypeProperty: false,
    });

    setAlert({
      ...alert,
      openAlert: false,
    });
  };

  const changeCountries = (data) => {
    setValues({
      ...values,
      countries: data !== null ? data.id : "",
      countriesData: data !== null ? data : "",
      states: "",
      statesData: "",
      city: "",
      cityData: "",
      disabledStates: data !== null ? false : true,
      disabledCity: true,
      errorCountries: false,
    });

    setAlert({
      ...alert,
      openAlert: false,
    });
  };

  const changeStates = (data) => {
    setValues({
      ...values,
      states: data !== null ? data.id : "",
      statesData: data !== null ? data : "",
      city: "",
      cityData: "",
      disabledCity: data !== null ? false : true,
      errorStates: false,
    });

    setAlert({
      ...alert,
      openAlert: false,
    });
  };

  const changeCity = (data) => {
    setValues({
      ...values,
      city: data !== null ? data.id : "",
      cityData: data !== null ? data : "",
      errorCity: false,
    });

    setAlert({
      ...alert,
      openAlert: false,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setAlert({
      ...alert,
      openAlert: false,
    });

    if (!values.headerImage) {
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar una imágen de cabecera.",
      });
      setLoaders(false);
      return;
    }

    if (values.constructor.length === 0) {
      setValues({ ...values, errorContructor: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Nombre de la constructora es obligatorio.",
      });
      setLoaders(false);
      return;
    }

    if (values.whatsApp.length === 0) {
      setValues({ ...values, errorWhatsApp: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar un teléfono de whatsApp de contacto.",
      });
      setLoaders(false);
      return;
    }

    if (dataImageSlider.length === 0) {
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar imágenes del proyecto.",
      });
      setLoaders(false);
      return;
    }

    if (values.description.length === 0) {
      setValues({ ...values, errorDescription: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar una descripción del proyecto.",
      });
      setLoaders(false);
      return;
    }

    if (selectedItems.length === 0) {
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar servicios que ofrece el proyecto.",
      });
      setLoaders(false);
      return;
    }

    if (values.countries.length === 0) {
      setValues({ ...values, errorCountries: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar el país.",
      });
      setLoaders(false);
      return;
    }

    if (values.states.length === 0) {
      setValues({ ...values, errorStates: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar la provincia.",
      });
      setLoaders(false);
      return;
    }

    if (values.city.length === 0) {
      setValues({ ...values, errorCity: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar la ciudad.",
      });
      setLoaders(false);
      return;
    }

    if (values.descriptionLocation.length === 0) {
      setValues({ ...values, errorDescriptionLocation: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar una descripción de la ubicación.",
      });
      setLoaders(false);
      return;
    }

    const latitude_longitude_map = {
      lt: values.latidude === "" ? 0 : values.latidude,
      lg: values.longitude === "" ? 0 : values.longitude,
    };

    const dataValue = {
      constructora: values.constructor,
      phone: values.whatsApp,
      linkYoutube: values.linkYouTube,
      description: values.description,
      services: JSON.stringify(selectedItems),
      viewPlanos: values.sectionPlan ? 1 : 0,
      countriesId: values.countries,
      statesId: values.states,
      cityId: values.city,
      descriptionLocation: values.descriptionLocation,
      viewLocation: values.sectionLocation ? 1 : 0,
      ltLgLocation: JSON.stringify(latitude_longitude_map),
    };

    try {
      await axios.put(
        `${urlServices}project-post/${props.id.row.id}`,
        dataValue,
        {
          headers: {
            Authorization: "Bearer " + keyAuthorization,
          },
        }
      );

      const imagesPromises = [];

      if (values.headerImage.length > 0) {
        imagesPromises.push(
          uploadImage("headerImage", values.headerImage, props.id.row.id)
        );
      }

      if (dataImageSlider.length > 0) {
        imagesPromises.push(
          uploadImage("images", dataImageSlider, props.id.row.id)
        );
      }

      if (informationPlans.length > 0) {
        imagesPromises.push(
          uploadImage("planos", informationPlans, props.id.row.id)
        );
      }

      await Promise.all(imagesPromises);

      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "success",
        mensaje: "Proyecto modificado con éxito.",
      });
      searchUpdate();
      props.callBackRefresh();
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setLoaders(false);
        setMensageSystem("La sesión ha expirado, vuelva a iniciar sesión ...");
        setError(true);
        setTimeout(() => {
          localStorage.clear();
          setReturnLogin(true);
        }, 4000);
      } else if (e.response && e.response.status === 500) {
        setLoaders(false);
        setMensageSystem("Error en la consulta con el servidor.");
        setError(true);
      } else {
        setLoaders(false);
        setMensageSystem("Error al procesar la solicitud.");
        setError(true);
      }
    }
  };

  const uploadImage = async (value, images, id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("value", value);

    // Función para manejar la eliminación secuencial
    const deleteImages = async (images) => {
      for (const image of images) {
        if (image.images && image.imageUpload === "delete") {
          try {
            const response = await axios.put(
              `${urlServices}project-post/deleteImages/${id}`,
              { imageName: image.images, value: value },
              {
                headers: {
                  Authorization: `Bearer ${keyAuthorization}`,
                },
              }
            );
            if (response.status !== 200) {
              throw new Error(
                `Error al eliminar la imagen: ${response.statusText}`
              );
            }
          } catch (error) {
            console.error(
              `Error al eliminar la imagen ${image.images}:`,
              error.response ? error.response.data : error.message
            );
            // Continuar con el resto de las imágenes
          }
        }
      }
    };

    // Añadir archivos al FormData
    const addFilesToFormData = (images) => {
      images.forEach((image) => {
        if (value === "planos") {
          if (image.image && image.image.imageUpload !== "delete") {
            // Verifica que image.imageUpload es un objeto File o Blob
            formData.append("files", image.image.imageUpload);
          }
        } else {
          if (image.imageUpload && image.imageUpload !== "delete") {
            // Verifica que image.imageUpload es un objeto File o Blob
            formData.append("files", image.imageUpload);
          }
        }
      });
    };

    try {
      await deleteImages(images);
      addFilesToFormData(images);

      if (formData.has("files")) {
        const response = await axios.post(
          `${urlServices}project-post/uploadImages`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${keyAuthorization}`,
            },
          }
        );

        if (value === "planos") {
          const planosValue = parseJsonArray(response.data.updatedData.planos);

          const updatedInformationPlans = images.map((data) => {
            const { image, ...rest } = data;
            return rest;
          });

          updateValuePlanos(
            response.data.updatedData.id,
            updatedInformationPlans,
            planosValue
          );
        }
      }
    } catch (error) {
      console.error(
        "Error en el proceso de carga y eliminación de imágenes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const searchUpdate = async () => {
    const response = await axios.get(
      `${urlServices}project-post/list/user/${UserAuth.id}`,
      {
        headers: {
          Authorization: `Bearer ${keyAuthorization}`,
        },
      }
    );

    const imageValue = parseJsonArray(response.data[0].images);
    const planosValue = parseJsonArray(response.data[0].planos);

    setDataImageSlider(imageValue);
    setInformationPlans(planosValue);
    setLoaders(false);
  };

  const updateValuePlanos = async (id, data, planos) => {
    // Asigna imágenes a los objetos en data basándote en el índice
    data.forEach((pl, index) => {
      if (index < planos.length) {
        // Asegúrate de no acceder a un índice fuera de rango
        pl.images = planos[index].images;
      }
    });

    const values = {
      planos: JSON.stringify(data),
    };

    try {
      await axios.put(`${urlServices}project-post/${id}`, values, {
        headers: {
          Authorization: `Bearer ${keyAuthorization}`,
        },
      });
    } catch (error) {
      console.error("Error al actualizar las imágenes:", error);
    }
  };

  const parseJsonArray = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  };

  const handleRemoveClick = (imageName, index) => {
    const updatedImages = informationPlans.map((data) => {
      // Verifica si la imagen coincide
      if (data.images === imageName) {
        // Establece imageUpload a "delete"
        return {
          ...data,
          imageUpload: "delete",
        };
      }
      // Retorna el objeto sin cambios
      return data;
    });

    // Eliminar el elemento en el índice proporcionado si existe
    if (
      index !== -1 &&
      informationPlans[index].image &&
      informationPlans[index].image.newImage === imageName
    ) {
      updatedImages.splice(index, 1);
    }

    // Actualiza el estado con el nuevo array
    setInformationPlans(updatedImages);
    setDisabled(false);
  };

  const handleChangeServices = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
    setDisabled(false);
  };

  const handleChange = useCallback(
    debounce((prop, value) => {
      setValues((prevValues) => ({
        ...prevValues,
        [prop]: value,
        errorContructor: false,
        errorWhatsApp: false,
        errorDescription: false,
        errorDescriptionLocation: false,
        errorPrice: false,
        errorRooms: false,
        errorBathrooms: false,
        errorParking: false,
        errorArea: false,
      }));

      setAlert((prevAlert) => ({
        ...prevAlert,
        openAlert: false,
      }));

      setDisabled(false);
    }, 10),
    []
  );

  const handleValueImageUpload = (value) => async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/webp"
    ) {
      // Verifica el tamaño del archivo (1 MB = 1,000,000 bytes)
      if (file.size <= 1000000) {
        try {
          // Obtén la URL para mostrar la imagen (sin redimensionar)
          const imageUrl = URL.createObjectURL(file);

          const newImage = {
            newImage: imageUrl,
            imageUpload: file,
          };

          let totalImages; // Cambiado a let

          if (value !== "planImage") {
            // Asegúrate de que `values[value]` sea un array antes de agregar
            totalImages = Array.isArray(values[value])
              ? [...values[value], newImage]
              : [newImage]; // Si no es un array, comienza uno nuevo
          } else {
            totalImages = newImage; // Se asigna la URL directamente
          }

          // Actualizar el estado con la nueva imagen
          setValues((prevValues) => ({
            ...prevValues,
            [value]: totalImages,
          }));

          setDisabled(false);
        } catch (error) {
          setAlert({
            ...alert,
            openAlert: true,
            errorAlert: "error",
            mensaje: "Error al procesar la imagen.",
          });
        }
      } else {
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: "El tamaño del archivo no debe exceder 1 MB.",
        });
      }
    } else {
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Solo se permiten archivos JPG y PNG.",
      });
    }
  };

  const handleDeleteValueImage = (value) => {
    if (value !== "planImage") {
      values[value].forEach((data) => {
        data.imageUpload = "delete";
      });
    }

    setValues((prevValues) => ({
      ...prevValues,
      [value]: value === "planImage" ? null : values[value],
    }));
    setDisabled(false);
  };

  const handleImageSliderUpload = () => async (event) => {
    const files = event.target.files; // Obtén todos los archivos seleccionados
    if (!files.length) return;

    // Filtra y procesa las imágenes válidas
    const newImages = Array.from(files)
      .filter((file) => {
        if (
          !(
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/webp"
          )
        ) {
          setAlert({
            ...alert,
            openAlert: true,
            errorAlert: "error",
            mensaje: "Solo se permiten archivos JPG, PNG y WEBP.",
          });
          return false;
        }
        if (file.size > 1000000) {
          setAlert({
            ...alert,
            openAlert: true,
            errorAlert: "error",
            mensaje: "El tamaño del archivo no debe exceder 1 MB.",
          });
          return false;
        }
        return true;
      })
      .map((file) => {
        // Obtén la URL para mostrar la imagen (sin redimensionar)
        const imageUrl = URL.createObjectURL(file);
        return {
          imagesNew: imageUrl,
          imageUpload: file,
        };
      });

    if (newImages.length > 0) {
      const totalImages = [...dataImageSlider, ...newImages];
      setDataImageSlider(totalImages);
      setDisabled(false);
    }
  };

  const handleDeleteImageSlider = (imageName) => {
    const updatedImages = dataImageSlider.map((data) => {
      // Si el índice coincide, establece imageUpload en "delete"
      if (data.images === imageName || data.imagesNew === imageName) {
        return { ...data, imageUpload: "delete" };
      }
      // Retorna el objeto sin cambios
      return data;
    });
    // Actualiza el estado con el nuevo array
    setDataImageSlider(updatedImages);
    setDisabled(false);
  };

  const handleAddPlan = () => {
    if (!values.planImage) {
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar una imágen del plano.",
      });
    } else if (values.typeProperty.length === 0) {
      setValues({ ...values, errorTypeProperty: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar el tipo de propiedad.",
      });
    } else if (values.price.length === 0) {
      setValues({ ...values, errorPrice: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar el Precio.",
      });
    } else if (values.rooms.length === 0) {
      setValues({ ...values, errorRooms: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar el número de Habitaciones.",
      });
    } else if (values.bathrooms.length === 0) {
      setValues({ ...values, errorBathrooms: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar el número de baños.",
      });
    } else if (values.parking.length === 0) {
      setValues({ ...values, errorParking: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar el número de estacionamiento.",
      });
    } else if (values.area.length === 0) {
      setValues({ ...values, errorArea: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar el número de superficie (m2).",
      });
    } else {
      const newPlan = {
        image: values.planImage,
        typeProperty: values.typeProperty,
        price: values.price,
        rooms: values.rooms,
        bathrooms: values.bathrooms,
        halfBathrooms: values.halfBathrooms,
        serviceRoom: values.serviceRoom,
        livingRoom: values.livingRoom,
        warehouse: values.warehouse,
        parking: values.parking,
        area: values.area,
      };

      const updatePlan = [...informationPlans, newPlan];
      setInformationPlans(updatePlan);

      setValues({
        ...values,
        planImage: null,
        typeProperty: "",
        typePropertyData: "",
        rooms: "",
        bathrooms: "",
        halfBathrooms: "",
        serviceRoom: "",
        livingRoom: "",
        warehouse: "",
        parking: "",
        area: "",
        price: "",
      });
    }
  };

  const handleViewSectionLocation = (value) => () => {
    setValues((prevValues) => ({
      ...prevValues,
      sectionLocation: value,
      latidude: 0,
      longitude: 0,
    }));
    setDisabled(false);
  };

  const handleViewSectionPlan = (value) => () => {
    setValues({
      ...values,
      sectionPlan: value,
      planImage: null,
      typeProperty: "",
      typePropertyData: "",
      rooms: "",
      bathrooms: "",
      halfBathrooms: "",
      serviceRoom: "",
      livingRoom: "",
      warehouse: "",
      parking: "",
      area: "",
      price: "",
    });
    setDisabled(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ openAlert: false });
  };

  const locationMap = (data) => {
    setValues((prevValues) => ({
      ...prevValues,
      latidude: data.lat,
      longitude: data.lng,
    }));
    setDisabled(false);
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        {error ? <Alert severity="error">{mensageSystem}</Alert> : ""}
      </Grid>
      <Grid item xs={12} md={6}>
        {loaders ? (
          <center>
            <img
              src={loading}
              alt="loader"
              loading="lazy"
              style={{
                width: 70,
                objectFit: "cover",
              }}
            />
            <br></br>
            <ParagraphTextPage style={{ fontSize: 12, fontWeight: "bold" }}>
              Guardando registros...
            </ParagraphTextPage>
          </center>
        ) : (
          <Button
            variant="contained"
            color="success"
            startIcon={<Save />}
            disabled={disabled}
            onClick={submitForm}
            sx={{ float: "right" }}
          >
            Guardar todos los cambios
          </Button>
        )}
      </Grid>
      <Card sx={{ padding: "15px 20px", margin: "10px 0" }} variant="outlined">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              Imágen de cabecera
            </b>
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ padding: 2 }}>
            {values.headerImage.filter((item) => item?.imageUpload !== "delete")
              .length > 0 ? (
              values.headerImage
                .filter((item) => item?.imageUpload !== "delete")
                .map((image, index) => {
                  let url = "";

                  // Comprobamos qué tipo de URL debemos usar
                  if (image.newImage) {
                    url = image.newImage;
                  } else if (image.images) {
                    url = `${urlServices}documents/images_project/${image.images}`;
                  } else {
                    url = noimage;
                  }

                  return (
                    <React.Fragment key={index}>
                      <ImageListItem
                        sx={{
                          padding: 4,
                          border: "1px solid rgba(0, 0, 0, 0.12)",
                        }}
                      >
                        <img
                          src={url}
                          alt="image"
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: 230,
                            objectFit:
                              image.newImage || image.images
                                ? "cover"
                                : "contain",
                          }}
                        />
                        <b
                          style={{
                            fontSize: 10,
                            float: "right",
                            padding: 5,
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteValueImage("headerImage")}
                        >
                          Eliminar&nbsp;
                          <Close sx={{ fontSize: 14 }} />
                        </b>
                      </ImageListItem>
                      <center>
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUpload />}
                          sx={{ marginTop: 1 }}
                          disabled={image.newImage || image.images}
                          size="small"
                        >
                          Subir imágen
                          <VisuallyHiddenInput
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleValueImageUpload("headerImage")}
                          />
                        </Button>
                      </center>
                    </React.Fragment>
                  );
                })
            ) : (
              <div style={{ textAlign: "center", padding: 20 }}>
                <ImageListItem
                  sx={{
                    padding: 4,
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img
                    src={noimage}
                    alt="image"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 230,
                      objectFit: "contain",
                    }}
                  />
                </ImageListItem>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                  size="small"
                  sx={{ marginTop: 1 }}
                >
                  Subir imágen
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleValueImageUpload("headerImage")}
                  />
                </Button>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={5} sx={{ marginTop: 1 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              Constructora:
            </b>
            <TextField
              //label="Constructora"
              name="constructor"
              variant="outlined"
              value={values.constructor}
              error={values.errorContructor}
              onChange={(event) =>
                handleChange("constructor", event.target.value)
              }
              type="text"
              autoComplete="off"
              margin="dense"
              placeholder="Nombre ..."
              inputProps={{ maxLength: 100 }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={3} sx={{ marginTop: 1 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              WhatsApp de contacto:
            </b>
            <TextField
              // label="WhatsApp de contacto"
              name="whatsApp"
              variant="outlined"
              value={values.whatsApp}
              error={values.errorWhatsApp}
              onChange={(event) => handleChange("whatsApp", event.target.value)}
              type="text"
              autoComplete="off"
              margin="dense"
              fullWidth
              size="small"
              inputProps={{ maxLength: 14 }}
              placeholder="+59395865456 ..."
            />
            <FormHelperText style={{ fontSize: 11 }}>
              Agregar el prefijo ejemplo: +593 de ecuador
            </FormHelperText>
          </Grid>
          <Grid item xs={12} md={4} sx={{ marginTop: 1 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              Video de YouTube
              <span style={{ fontSize: 10, marginLeft: 5 }}>(Opcional)</span>:
            </b>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="linkYouTube"
              value={values.linkYouTube}
              onChange={(event) =>
                handleChange("linkYouTube", event.target.value)
              }
              type="text"
              autoComplete="off"
              margin="dense"
              fullWidth
              placeholder="3Wdlnj_mLV4 ..."
              size="small"
            />
            <FormHelperText style={{ fontSize: 10.5 }}>
              Pegue el código que esta al final del link v="3Wdlnj_mLV4"
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 2 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              Imágenes del proyecto:
            </b>
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} sx={{ padding: "0 10px" }}>
                <Grid container>
                  {dataImageSlider.filter(
                    (item) => item?.imageUpload !== "delete"
                  ).length > 0 ? (
                    dataImageSlider
                      .filter((item) => item?.imageUpload !== "delete")
                      .map((image, index) => {
                        let url = "";

                        // Comprobamos qué tipo de URL debemos usar
                        if (image.imagesNew) {
                          url = image.imagesNew;
                        } else if (image.images) {
                          url = `${urlServices}documents/images_project/${image.images}`;
                        } else {
                          url = noimage;
                        }

                        return (
                          <Grid item xs={12} md={3} key={index}>
                            <ImageListItem
                              key={index}
                              sx={{
                                padding: 1,
                              }}
                            >
                              <img
                                src={url}
                                alt={`image${index}`}
                                loading="lazy"
                                style={{
                                  width: 250,
                                  height: 180,
                                  objectFit: "cover",
                                }}
                              />
                              <b
                                style={{
                                  fontSize: 10,
                                  float: "right",
                                  padding: 5,
                                  color: "red",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleDeleteImageSlider(
                                    image.imagesNew || image.images
                                  )
                                }
                              >
                                Eliminar&nbsp;
                                <Close sx={{ fontSize: 14 }} />
                              </b>
                            </ImageListItem>
                          </Grid>
                        );
                      })
                  ) : (
                    <Grid item xs={12} sm={12} md={12}>
                      <center>
                        <img
                          src={noimage}
                          alt="no-image"
                          loading="lazy"
                          style={{ height: 250, objectFit: "contain" }}
                        />
                      </center>
                    </Grid>
                  )}
                </Grid>
                <center>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUpload />}
                    sx={{ marginTop: 1 }}
                    // disabled={rowsImage.length >= 10 ? true : false}
                    size="small"
                  >
                    Subir imágen para el SLIDER
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageSliderUpload()}
                      multiple
                    />
                  </Button>
                </center>
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 5 }}>
                <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
                  Descripción del proyecto
                  <span style={{ fontSize: 10, marginLeft: 5 }}>
                    (Una descripción breve)
                  </span>
                  :
                </b>
                <TextField
                  // label="Descripción del proyecto"
                  name="description"
                  variant="outlined"
                  value={values.description}
                  error={values.errorDescription}
                  onChange={(event) =>
                    handleChange("description", event.target.value)
                  }
                  type="text"
                  autoComplete="off"
                  margin="dense"
                  multiline
                  rows={5}
                  fullWidth
                  inputProps={{ maxLength: 600 }}
                  size="small"
                />
                <FormHelperText>
                  Máximo permitido de información{" "}
                  {`${values.description.length} / 600`}
                </FormHelperText>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              Selección de servicios
            </b>
            <ParagraphTextPage style={{ fontSize: 14, margin: "5px 0" }}>
              Seleccione los servicios que el proyecto ofrece.
            </ParagraphTextPage>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container>
              {items.map((item) => (
                <Grid
                  key={item.id}
                  xs={6}
                  md={2}
                  item
                  sx={{
                    cursor: "pointer",
                    border: "0.5px solid #CCCCCC",
                    paddingTop: 1,
                    backgroundColor: selectedItems.includes(item.id)
                      ? "lightgreen"
                      : "transparent",
                  }}
                  onClick={() => handleChangeServices(item.id)}
                >
                  <center>
                    {item.icon}
                    <div
                      style={{
                        color: "#000",
                        fontSize: 10,
                      }}
                    >
                      {item.label}
                    </div>
                    <Box
                      sx={{
                        width: "100%",
                        backgroundColor: selectedItems.includes(item.id)
                          ? "lightgreen"
                          : "whitesmoke",
                      }}
                    >
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        /*onChange={() =>
                                              handleChangeServices(item.id)
                                            }*/
                      />
                    </Box>
                  </center>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              Agregar ubicación
            </b>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LoadCountries
              value={values.countriesData}
              refresh={changeCountries}
              error={values.errorCountries}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LoadStates
              value={values.statesData}
              refresh={changeStates}
              error={values.errorStates}
              disabled={values.disabledStates}
              idCountries={values.countries}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LoadCities
              value={values.cityData}
              refresh={changeCity}
              error={values.errorCity}
              disabled={values.disabledCity}
              idStates={values.states}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              Descripción de la ubicación
              <span style={{ fontSize: 10, marginLeft: 5 }}>
                (Una descripción breve)
              </span>
              :
            </b>
            <TextField
              name="descriptionLocation"
              value={values.descriptionLocation}
              error={values.errorDescriptionLocation}
              onChange={(event) =>
                handleChange("descriptionLocation", event.target.value)
              }
              type="text"
              required
              fullWidth
              // label="Condominio/Alicuota"
              margin="dense"
              autoComplete="off"
              variant="outlined"
              size="small"
              multiline
              rows={2}
              inputProps={{ maxLength: 300 }}
              placeholder="Ingrese..."
            />
            <FormHelperText>
              Máximo permitido de información{" "}
              {`${values.descriptionLocation.length} / 300}`}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ marginTop: 2 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              Mapa de ubicación
              <Button
                variant="contained"
                startIcon={
                  values.sectionLocation ? <VisibilityOff /> : <Visibility />
                }
                sx={{ fontSize: 10, marginLeft: 5 }}
                size="small"
                color={values.sectionLocation ? "error" : "success"}
                onClick={handleViewSectionLocation(!values.sectionLocation)}
              >
                {values.sectionLocation
                  ? "Ocultar sección"
                  : "Habilitar sección"}
              </Button>
            </b>
            <ParagraphTextPage style={{ fontSize: 14, margin: "5px 0" }}>
              Dar clic en el mapa, ubicando el lugar aproximado del proyecto.
            </ParagraphTextPage>
          </Grid>
          {values.sectionLocation && (
            <Grid item xs={12} sm={12}>
              <SaveMap
                lt={parseInt(values.latidude) === 0 ? -2.0 : values.latidude}
                lg={parseInt(values.longitude) === 0 ? -77.5 : values.longitude}
                zoom={6}
                dataLocation={locationMap}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={12} sx={{ marginTop: 3 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              Agregar planos del proyecto
              <Button
                variant="contained"
                startIcon={
                  values.sectionPlan ? <VisibilityOff /> : <Visibility />
                }
                sx={{ fontSize: 10, marginLeft: 5 }}
                size="small"
                color={values.sectionPlan ? "error" : "success"}
                onClick={handleViewSectionPlan(!values.sectionPlan)}
              >
                {values.sectionPlan ? "Ocultar sección" : "Habilitar sección"}
              </Button>
            </b>
          </Grid>
          {values.sectionPlan && (
            <>
              <Grid item xs={12} sm={6} md={6} sx={{ padding: 2 }}>
                <ImageListItem
                  key={1}
                  sx={{
                    padding: 4,
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img
                    src={
                      values.planImage?.newImage
                        ? values.planImage.newImage
                        : values.planImage
                        ? values.planImage
                        : noimage
                    }
                    alt="image1"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 230,
                      objectFit: "contain",
                    }}
                  />
                  <b
                    style={{
                      fontSize: 10,
                      float: "right",
                      padding: 5,
                      color: "red",
                      cursor: "pointer",
                      display: values.planImage?.newImage ? "block" : "none",
                    }}
                    onClick={() => handleDeleteValueImage("planImage")}
                  >
                    Eliminar&nbsp;
                    <Close sx={{ fontSize: 14 }} />
                  </b>
                </ImageListItem>
                <center>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUpload />}
                    sx={{ marginTop: 1 }}
                    disabled={values.planImage?.newImage ? true : false}
                    size="small"
                  >
                    Subir plano
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleValueImageUpload("planImage")}
                      // multiple
                    />
                  </Button>
                </center>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={8}>
                    <LoadTypeProperty
                      value={values.typePropertyData}
                      refresh={changeTypeProperty}
                      error={values.errorTypeProperty}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      name="price"
                      value={values.price}
                      error={values.errorPrice}
                      onChange={(event) =>
                        handleChange("price", event.target.value)
                      }
                      type="number"
                      fullWidth
                      required
                      label="Precio"
                      margin="dense"
                      autoComplete="off"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                      placeholder="0"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <b
                      className={classes.cardTitleBlack}
                      style={{ fontSize: 14 }}
                    >
                      Habitaciones:
                    </b>
                    <TextField
                      name="rooms"
                      value={values.rooms}
                      error={values.errorRooms}
                      onChange={(event) =>
                        handleChange("rooms", event.target.value)
                      }
                      type="number"
                      fullWidth
                      required
                      // label="Habitaciones"
                      margin="dense"
                      autoComplete="off"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                      placeholder="0"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <b
                      className={classes.cardTitleBlack}
                      style={{ fontSize: 14 }}
                    >
                      Baños:
                    </b>
                    <TextField
                      name="bathrooms"
                      value={values.bathrooms}
                      error={values.errorBathrooms}
                      onChange={(event) =>
                        handleChange("bathrooms", event.target.value)
                      }
                      type="number"
                      fullWidth
                      required
                      // label="Baños"
                      margin="dense"
                      autoComplete="off"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                      placeholder="0"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <b
                      className={classes.cardTitleBlack}
                      style={{ fontSize: 14 }}
                    >
                      Medio baño:
                    </b>
                    <TextField
                      name="halfBathrooms"
                      value={values.halfBathrooms}
                      onChange={(event) =>
                        handleChange("halfBathrooms", event.target.value)
                      }
                      type="number"
                      fullWidth
                      //label="Medio baño"
                      margin="dense"
                      autoComplete="off"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                      placeholder="0"
                    />
                    <span style={{ fontSize: 7 }}>(Opcional)</span>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <b
                      className={classes.cardTitleBlack}
                      style={{ fontSize: 14 }}
                    >
                      Cuarto servicio:
                    </b>
                    <TextField
                      name="serviceRoom"
                      value={values.serviceRoom}
                      onChange={(event) =>
                        handleChange("serviceRoom", event.target.value)
                      }
                      type="number"
                      fullWidth
                      //label="Medio baño"
                      margin="dense"
                      autoComplete="off"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                      placeholder="0"
                    />
                    <span style={{ fontSize: 7 }}>(Opcional)</span>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <b
                      className={classes.cardTitleBlack}
                      style={{ fontSize: 14 }}
                    >
                      Sala de estar:
                    </b>
                    <TextField
                      name="livingRoom"
                      value={values.livingRoom}
                      onChange={(event) =>
                        handleChange("livingRoom", event.target.value)
                      }
                      type="number"
                      fullWidth
                      //label="Medio baño"
                      margin="dense"
                      autoComplete="off"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                      placeholder="0"
                    />
                    <span style={{ fontSize: 7 }}>(Opcional)</span>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <b
                      className={classes.cardTitleBlack}
                      style={{ fontSize: 14 }}
                    >
                      Bodega:
                    </b>
                    <TextField
                      name="warehouse"
                      value={values.warehouse}
                      onChange={(event) =>
                        handleChange("warehouse", event.target.value)
                      }
                      type="number"
                      fullWidth
                      //label="Medio baño"
                      margin="dense"
                      autoComplete="off"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                      placeholder="0"
                    />
                    <span style={{ fontSize: 7 }}>(Opcional)</span>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <b
                      className={classes.cardTitleBlack}
                      style={{ fontSize: 14 }}
                    >
                      Estacionamiento:
                    </b>
                    <TextField
                      name="parking"
                      value={values.parking}
                      error={values.errorParking}
                      onChange={(event) =>
                        handleChange("parking", event.target.value)
                      }
                      type="number"
                      required
                      fullWidth
                      // label="Estacionamiento"
                      margin="dense"
                      autoComplete="off"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                      placeholder="0"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <b
                      className={classes.cardTitleBlack}
                      style={{ fontSize: 14 }}
                    >
                      Superficie (m2):
                    </b>
                    <TextField
                      name="area"
                      value={values.area}
                      error={values.errorArea}
                      onChange={(event) =>
                        handleChange("area", event.target.value)
                      }
                      type="number"
                      required
                      fullWidth
                      // label="Superficie (m2)"
                      margin="dense"
                      autoComplete="off"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                      }}
                      placeholder="0"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <center>
                  <Button
                    style={{ marginTop: 12 }}
                    onClick={handleAddPlan}
                    startIcon={<AddCircle />}
                    variant="contained"
                    size="small"
                  >
                    Agregar plano
                  </Button>
                </center>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                style={{ paddingLeft: 70, paddingRight: 70 }}
              >
                {informationPlans.length > 0 ? (
                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="a dense table"
                    sx={{ margin: "15px 0" }}
                  >
                    <TableBody>
                      <TableCell component="th" scope="row">
                        <b>Plano</b>{" "}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <b>Información</b>{" "}
                      </TableCell>
                      <TableCell component="th" scope="row"></TableCell>
                      {informationPlans.filter(
                        (item) => item?.imageUpload !== "delete"
                      ).length > 0 ? (
                        informationPlans
                          .filter((item) => item?.imageUpload !== "delete")
                          .map((row1, i1) => {
                            return (
                              <StyledTableRow key={i1}>
                                <TableCell
                                  // align="center"
                                  component="th"
                                  scope="row"
                                >
                                  <img
                                    src={
                                      row1.images
                                        ? `${urlServices}documents/images_project/${row1.images}`
                                        : row1.image.newImage
                                    }
                                    alt={`image${i1}`}
                                    loading="lazy"
                                    style={{
                                      width: 150,
                                      objectFit: "cover",
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  // align="center"
                                  component="th"
                                  scope="row"
                                >
                                  {row1.typeProperty.name} de {row1.area} m2
                                  <br></br>
                                  Dormitorios: {row1.rooms}
                                  <br></br>
                                  Baños: {row1.bathrooms}
                                  <br></br>
                                  {row1.halfBathrooms !== 0 &&
                                    row1.halfBathrooms !== "" && (
                                      <div>
                                        Dormitrio: {row1.halfBathrooms}
                                        <br></br>
                                      </div>
                                    )}
                                  {row1.serviceRoom !== 0 &&
                                    row1.serviceRoom !== "" && (
                                      <div>
                                        Cuarto de servicio: {row1.serviceRoom}
                                        <br></br>
                                      </div>
                                    )}
                                  {row1.livingRoom !== 0 &&
                                    row1.livingRoom !== "" && (
                                      <div>
                                        Sala de estar: {row1.livingRoom}
                                        <br></br>
                                      </div>
                                    )}
                                  {row1.warehouse !== 0 &&
                                    row1.warehouse !== "" && (
                                      <div>
                                        Bodega: {row1.warehouse}
                                        <br></br>
                                      </div>
                                    )}
                                  Sala y cocina: 1<br></br>
                                  Estacionamiento: {row1.parking}
                                  <br></br>
                                  <b>Precio: ${row1.price}</b>
                                </TableCell>
                                <TableCell
                                  align="center"
                                  component="th"
                                  scope="row"
                                >
                                  <Delete
                                    style={{
                                      cursor: "pointer",
                                      float: "right",
                                    }}
                                    onClick={() =>
                                      handleRemoveClick(
                                        row1.images || row1.image.newImage,
                                        i1
                                      )
                                    }
                                  />
                                </TableCell>
                              </StyledTableRow>
                            );
                          })
                      ) : (
                        <StyledTableRow>
                          <TableCell
                            // align="center"
                            component="th"
                            scope="row"
                            colSpan={2}
                          >
                            <div
                              style={{
                                color: "rgba(0, 0, 0, 0.6)",
                                textAlign: "center",
                                margin: "50px 0",
                              }}
                            >
                              <b>No hay planos registrados</b>
                            </div>
                          </TableCell>
                        </StyledTableRow>
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  <div
                    style={{
                      color: "rgba(0, 0, 0, 0.6)",
                      textAlign: "center",
                      margin: "50px 0",
                    }}
                  >
                    <b>No hay planos registrados</b>
                  </div>
                )}
              </Grid>
            </>
          )}
        </Grid>
      </Card>
      {alert.openAlert && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleCloseAlert}
        >
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Alert
              onClose={handleCloseAlert}
              severity={alert.errorAlert === "error" ? "error" : "success"}
              elevation={6}
              variant="filled"
            >
              {alert.mensaje}
            </Alert>
          </Slide>
        </Snackbar>
      )}
    </Grid>
  );
}
