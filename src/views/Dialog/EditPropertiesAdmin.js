import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";
import debounce from "lodash.debounce";

import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  ArrowForward,
  ArrowBack,
  Cancel,
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
  CheckCircleOutline,
  RemoveCircleOutline,
} from "@mui/icons-material";
import {
  Grid,
  Button,
  Divider,
  Slide,
  Snackbar,
  TextField,
  Alert,
  Checkbox,
  Radio,
  FormControl,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Box,
  FormHelperText,
  ImageListItem,
} from "@mui/material";
import { NumericFormat } from "react-number-format";

import LoadTypeOperation from "components/Services/LoadTypeOperation";
import LoadTypeProperty from "components/Services/LoadTypeProperty";
import LoadSubTypeProperty from "components/Services/LoadSubTypeProperty";
import LoadCountries from "components/Services/LoadCountries";
import LoadStates from "components/Services/LoadStates";
import LoadCities from "components/Services/LoadCities";
import noimage from "assets/img/noimage.jpeg";
import loading from "assets/img/loading.gif";

import {
  cardBodyStyle,
  ButtonStyle0,
  ButtonExit,
  blackColor,
  ParagraphTextPage,
} from "components/cardBodyStyle";

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

const useStyles = makeStyles(cardBodyStyle);

const steps = ["Inmueble", "Multimedia", "Extras"];

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

const QontoStepIconRoot = styled("div")(({ theme }) => ({
  color: "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  "& .QontoStepIcon-completedIcon": {
    color: blackColor,
    zIndex: 1,
    fontSize: 24,
  },
  ...theme.applyStyles("dark", {
    color: blackColor,
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        color: blackColor,
      },
    },
  ],
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  let valueCompleted = false;

  if (active === true) {
    valueCompleted = true;
  }

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {valueCompleted ? (
        <CheckCircleOutline className="QontoStepIcon-completedIcon" />
      ) : completed ? (
        <CheckCircleOutline className="QontoStepIcon-completedIcon" />
      ) : (
        <RemoveCircleOutline />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

export default function EditPropertiesAdmin(props) {
  const classes = useStyles();

  const [returnLogin, setReturnLogin] = React.useState(false);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [loaders, setLoaders] = useState(false);
  const [rowsImage, setRowsImage] = useState(props.id.row.images);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [valueImagePrincipal, setValueImagePrincipal] = React.useState();
  const [selectedItems, setSelectedItems] = useState(props.id.row.services);
  const [alert, setAlert] = React.useState({
    openAlert: false,
    errorAlert: "error",
    mensaje: "",
  });

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [values, setValues] = React.useState({
    typeOperation: props.id.row.typeOperationId,
    typeProperty: props.id.row.typePropertyId,
    subTypeProperty: props.id.row.subTypePropertyId,
    parking: props.id.row.details[0].parking,
    rooms: props.id.row.details[0].rooms,
    bathrooms: props.id.row.details[0].bathrooms,
    halfBathrooms: props.id.row.details[0].halfBathrooms,
    area: props.id.row.details[0].area,
    age: props.id.row.details[0].age,
    livingRoom: props.id.row.details[0].livingRoom,
    serviceRoom: props.id.row.details[0].serviceRoom,
    warehouse: props.id.row.details[0].warehouse,
    alicuota: props.id.row.details[0].alicuota,
    title: props.id.row.title,
    price: props.id.row.price,
    description: props.id.row.description,
    typeOperationData: {
      id: props.id.row.typeOperationId,
      name: props.id.row.typeOperation ? props.id.row.typeOperation.name : "",
    },
    typePropertyData: {
      id: props.id.row.typePropertyId,
      name: props.id.row.typeProperty ? props.id.row.typeProperty.name : "",
    },
    subTypePropertyData: {
      id: props.id.row.subTypePropertyId,
      name: props.id.row.subTypeProperty
        ? props.id.row.subTypeProperty.name
        : "",
    },
    disabledSubtypeProperty: false,
    countries: props.id.row.countriesId,
    countriesData: {
      id: props.id.row.countriesId,
      name: props.id.row.countries ? props.id.row.countries.name : "",
    },
    states: props.id.row.statesId,
    statesData: {
      id: props.id.row.statesId,
      name: props.id.row.states ? props.id.row.states.name : "",
    },
    city: props.id.row.cityId,
    cityData: {
      id: props.id.row.cityId,
      name: props.id.row.cities ? props.id.row.cities.name : "",
    },
    disabledStates: false,
    disabledCity: false,
    descriptionLocation: props.id.row.descriptionLocation,
    errorTypeOperation: false,
    errorTypeProperty: false,
    errorSubTypeProperty: false,
    errorRooms: false,
    errorBathrooms: false,
    errorParking: false,
    errorArea: false,
    errorAge: false,
    errorTitle: false,
    errorPrice: false,
    errorDescription: false,
    errorDescriptionLocation: false,
  });

  // Este efecto se ejecuta al montar el componente o cuando cambia `rowsImage`
  useEffect(() => {
    if (rowsImage.length > 0) {
      const firstImage = rowsImage[0];
      if (!rowsImage.some((image) => image.main === 1)) {
        // Si ninguna imagen es principal, asignar la primera como principal por defecto
        setRowsImage((prevImages) =>
          prevImages.map((image, index) =>
            index === 0 ? { ...image, main: 1 } : { ...image, main: 0 }
          )
        );
        setValueImagePrincipal(firstImage.value); // Establecer el valor del principal en el estado
      }
    }
  }, [rowsImage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const handleChange = useCallback(
    debounce((prop, value) => {
      setValues((prevValues) => ({
        ...prevValues,
        [prop]: value,
        errorRooms: false,
        errorBathrooms: false,
        errorParking: false,
        errorArea: false,
        errorTitle: false,
        errorPrice: false,
        errorDescription: false,
        errorDescriptionLocation: false,
      }));

      setAlert((prevAlert) => ({
        ...prevAlert,
        openAlert: false,
      }));
    }, 10),
    []
  );

  const changeTypeOperation = (data) => {
    setValues({
      ...values,
      typeOperation: data !== null ? data.id : "",
      typeOperationData: data !== null ? data : "",
      errorTypeOperation: false,
    });

    setAlert({
      ...alert,
      openAlert: false,
    });
  };

  const changeTypeProperty = (data) => {
    setValues({
      ...values,
      typeProperty: data !== null ? data.id : "",
      typePropertyData: data !== null ? data : "",
      subTypeProperty: "",
      subTypePropertyData: "",
      disabledSubtypeProperty: data !== null ? false : true,
      errorTypeProperty: false,
    });

    setAlert({
      ...alert,
      openAlert: false,
    });
  };

  const changeSubTypeProperty = (data) => {
    setValues({
      ...values,
      subTypeProperty: data !== null ? data.id : "",
      subTypePropertyData: data !== null ? data : "",
      errorSubTypeProperty: false,
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

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoaders(true);
    setAlert({
      ...alert,
      openAlert: false,
    });

    // Filtrar imágenes que deben ser insertadas
    const insertImage = rowsImage.filter((image) => image.imageUpload);

    // Crear objeto con valores de detalles
    const detailsValues = {
      rooms: values.rooms,
      bathrooms: values.bathrooms,
      halfBathrooms: values.halfBathrooms !== "" ? values.halfBathrooms : 0,
      area: values.area,
      parking: values.parking,
      alicuota: values.alicuota,
      age: values.age,
      serviceRoom: values.serviceRoom !== "" ? values.serviceRoom : 0,
      livingRoom: values.livingRoom !== "" ? values.livingRoom : 0,
      warehouse: values.warehouse !== "" ? values.warehouse : 0,
    };

    // Crear objeto de datos
    const dataValue = {
      typeOperationId: values.typeOperation,
      typePropertyId: values.typeProperty,
      subTypePropertyId: values.subTypeProperty,
      countriesId: values.countries,
      statesId: values.states,
      cityId: values.city,
      descriptionLocation: values.descriptionLocation,
      title: values.title,
      description: values.description,
      price: values.price,
      details: JSON.stringify([detailsValues]),
      services: JSON.stringify(selectedItems),
    };

    // Asignar imágenes solo si insertImage está vacío
    if (insertImage.length === 0) {
      dataValue.images = JSON.stringify(rowsImage);
    }

    axios
      .put(`${urlServices}publications/${props.id.row.id}`, dataValue, {
        headers: {
          Authorization: "Bearer " + keyAuthorization,
        },
      })
      .then((response) => {
        const imagesPromises = [];

        imagesPromises.push(uploadImage(rowsImage, props.id.row.id));

        // Esperar a que todas las promesas se resuelvan
        return Promise.all(imagesPromises);
      })
      .then((response) => {
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "success",
          mensaje: "Publicación modificada con éxito.",
        });
        setLoaders(false);

        props.callBackRefresh();
      })
      .catch((e) => {
        // console.log(e);
        if (e.response.status === 401) {
          setLoaders(false);
          setMensageSystem(
            "La sesión ha expirado, vuelva a iniciar sesión ..."
          );
          setError(true);

          setTimeout(() => {
            localStorage.clear();
            setReturnLogin(true);
          }, 4000);
        } else if (e.response.status === 500) {
          setLoaders(false);
          setMensageSystem("Error en la consulta con sel servidor.");
          setError(true);
        }
      });
  };

  const uploadImage = async (images, id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("valueDelete", true);

    // Función para manejar la eliminación secuencial
    const deleteImages = async (images) => {
      for (const image of images) {
        if (image.images && image.imageUpload === "delete") {
          try {
            const response = await axios.put(
              `${urlServices}publications/deleteImages/${id}`,
              { imageName: image.images },
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

    // Añadir archivos y sus atributos al FormData
    const addFilesToFormData = (images) => {
      images.forEach((image, index) => {
        if (image.imageUpload && image.imageUpload !== "delete") {
          formData.append(`files[${index}][file]`, image.imageUpload);
          formData.append(`files[${index}][main]`, image.main);
        }
      });
    };

    try {
      await deleteImages(images);
      addFilesToFormData(images);

      // Verifica si hay archivos en el FormData antes de enviar
      const hasFiles = Array.from(formData.entries()).some(([key]) =>
        key.startsWith("files[")
      );

      if (hasFiles) {
        await axios.post(`${urlServices}publications/uploadImages`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${keyAuthorization}`,
          },
        });
      }
    } catch (error) {
      console.error(
        "Error en el proceso de carga y eliminación de imágenes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 0) {
      if (values.typeOperation.length === 0) {
        setValues({ ...values, errorTypeOperation: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Tipo de operación" es obligatorio.',
        });
      } else if (values.typeProperty.length === 0) {
        setValues({ ...values, errorTypeProperty: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Tipo de inmueble" es obligatorio.',
        });
      } else if (values.subTypeProperty.length === 0) {
        setValues({ ...values, errorSubTypeProperty: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "SubTipo de inmueble" es obligatorio.',
        });
      } else if (values.rooms.length === 0) {
        setValues({ ...values, errorRooms: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Número de habitaciones" es obligatorio.',
        });
      } else if (values.bathrooms.length === 0) {
        setValues({ ...values, errorBathrooms: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Número de baños" es obligatorio.',
        });
      } else if (values.parking.length === 0) {
        setValues({ ...values, errorParking: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Número de estacionamiento" es obligatorio.',
        });
      } else if (values.area.length === 0) {
        setValues({ ...values, errorArea: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Superficie (m2)" es obligatorio.',
        });
      } else if (values.title.length === 0) {
        setValues({ ...values, errorTitle: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Título del inmueble" es obligatorio.',
        });
      } else if (values.price.length === 0) {
        setValues({ ...values, errorPrice: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Precio del inmueble" es obligatorio.',
        });
      } else if (values.description.length === 0) {
        setValues({ ...values, errorDescription: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Descripción" es obligatorio.',
        });
      } else if (values.countries.length === 0) {
        setValues({ ...values, errorCountries: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "País" es obligatorio.',
        });
      } else if (values.states.length === 0) {
        setValues({ ...values, errorStates: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Provincia" es obligatorio.',
        });
      } else if (values.city.length === 0) {
        setValues({ ...values, errorCity: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Ciudad" es obligatorio.',
        });
      } else if (values.descriptionLocation.length === 0) {
        setValues({ ...values, errorDescriptionLocation: true });
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: 'El campo "Descripción de la ubicación" es obligatorio.',
        });
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    } else if (activeStep === 1) {
      if (rowsImage.length === 0) {
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: "Debe agregar 1 o más fotos de la propiedad.",
        });
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    } else if (activeStep === 2) {
      if (selectedItems.length === 0) {
        setAlert({
          ...alert,
          openAlert: true,
          errorAlert: "error",
          mensaje: "Debe agregar 1 o más servicios de la propiedad.",
        });
      } else {
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setSkipped(newSkipped);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleImageUpload = () => async (event) => {
    const files = event.target.files; // Obtén todos los archivos seleccionados
    if (!files.length) return;

    // Verifica si el número total de imágenes con las nuevas sobrepasa el límite
    if (rowsImage.length >= 10) {
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Se ha alcanzado el límite máximo de 10 imágenes.",
      });
      return;
    }

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
          main: 0,
        };
      });

    if (newImages.length > 0) {
      // Limita el número total de imágenes a 8
      const totalImages = [...rowsImage, ...newImages];
      const limitedImages = totalImages.slice(0, 10);

      // Actualiza el estado con las imágenes limitadas
      setRowsImage(limitedImages);
    }
  };

  const handleDeleteImage = (index, imageIndex) => {
    // setRowsImage((prevImages) => prevImages.filter((_, i) => i !== index));
    const updatedSections = rowsImage.map((image, i) => {
      if (image.images === imageIndex || image.imagesNew === imageIndex) {
        // Marcar la imagen específica para eliminar
        return { ...image, imageUpload: "delete" };
      }
      return image;
    });

    setRowsImage(updatedSections);

    if (valueImagePrincipal === rowsImage[index].value) {
      // Reset the principal if the principal image was deleted
      if (rowsImage.length > 1) {
        const newPrincipalIndex = index === 0 ? 1 : 0;
        setRowsImage((prevImages) =>
          prevImages.map((image, i) =>
            i === newPrincipalIndex
              ? { ...image, main: 1 }
              : { ...image, main: 0 }
          )
        );
        setValueImagePrincipal(rowsImage[newPrincipalIndex].value);
      } else {
        setValueImagePrincipal("");
      }
    }
  };

  const handleChangeImagePrincipal = (event) => {
    const selectedIndex = parseInt(event.target.value, 10);
    setRowsImage((prevImages) =>
      prevImages.map((image, index) =>
        index === selectedIndex ? { ...image, main: 1 } : { ...image, main: 0 }
      )
    );
    setValueImagePrincipal(event.target.value);
  };

  const handleChangeServices = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ openAlert: false });
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  const maxLength = 300;

  return (
    <Fragment>
      <Grid container spacing={1} className={classes.containerProfile}>
        <Grid item xs={12} sm={12}>
          {error ? <Alert severity="error">{mensageSystem}</Alert> : ""}
        </Grid>
        <Grid item xs={12} sm={12}>
          <center>
            <Stepper activeStep={activeStep} sx={{ marginTop: "1%" }}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel
                      StepIconComponent={QontoStepIcon}
                      {...labelProps}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </center>
        </Grid>

        <Grid
          container
          spacing={1}
          style={{
            padding: "40px 10px 30px 10px",
          }}
        >
          <Grid item xs={12} sm={12}>
            <Box sx={{ width: "100%" }}>
              <React.Fragment>
                <Grid
                  container
                  spacing={1}
                  style={{
                    padding: "2px 20px",
                  }}
                >
                  {activeStep === 0 ? (
                    <>
                      <Grid item xs={12} sm={12}>
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 18 }}
                        >
                          Datos del inmueble
                        </b>
                        <Divider sx={{ marginBottom: 1, width: "100%" }} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 1 }}>
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 14 }}
                        >
                          Tipo de inmueble:
                        </b>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <LoadTypeOperation
                          value={values.typeOperationData}
                          refresh={changeTypeOperation}
                          error={values.errorTypeOperation}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <LoadTypeProperty
                          value={values.typePropertyData}
                          refresh={changeTypeProperty}
                          error={values.errorTypeProperty}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <LoadSubTypeProperty
                          value={values.subTypePropertyData}
                          refresh={changeSubTypeProperty}
                          error={values.errorSubTypeProperty}
                          disabled={values.disabledSubtypeProperty}
                          idTypeProperty={values.typeProperty}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
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
                      <Grid item xs={6} sm={3}>
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
                      <Grid item xs={6} sm={3}>
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
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 14 }}
                        >
                          Cuarto de servicio:
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
                      </Grid>
                      <Grid item xs={6} sm={3}>
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
                      </Grid>
                      <Grid item xs={6} sm={3}>
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
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 14 }}
                        >
                          Años de antiguedad:
                        </b>
                        <TextField
                          name="age"
                          value={values.age}
                          error={values.errorAge}
                          onChange={(event) =>
                            handleChange("age", event.target.value)
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
                      </Grid>
                      <Grid item xs={6} sm={3}>
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
                      <Grid item xs={6} sm={3}>
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
                      <Grid item xs={6} sm={3}>
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 14 }}
                        >
                          Condominio/Alicuota:
                        </b>
                        <TextField
                          name="alicuota"
                          value={values.alicuota}
                          onChange={(event) =>
                            handleChange("alicuota", event.target.value)
                          }
                          type="number"
                          required
                          fullWidth
                          // label="Condominio/Alicuota"
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
                      <Grid item xs={12} sm={12} sx={{ marginTop: 3 }}>
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 18 }}
                        >
                          Describe el inmueble
                        </b>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 14 }}
                        >
                          Título:
                        </b>
                        <TextField
                          name="title"
                          value={values.title}
                          error={values.errorTitle}
                          onChange={(event) =>
                            handleChange("title", event.target.value)
                          }
                          type="text"
                          required
                          fullWidth
                          // label="Condominio/Alicuota"
                          margin="dense"
                          autoComplete="off"
                          variant="outlined"
                          size="small"
                          inputProps={{ maxLength: 255 }}
                          placeholder="Ingrese..."
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 14 }}
                        >
                          Precio del inmueble:
                        </b>
                        <NumericFormat
                          customInput={TextField}
                          name="price"
                          value={values.price}
                          error={values.errorPrice}
                          onChange={(event) =>
                            handleChange("price", event.target.value)
                          }
                          allowNegative={false}
                          inputProps={{
                            style: {
                              textAlign: "center",
                            },
                          }}
                          decimalSeparator="."
                          // label="Precio"
                          fullWidth
                          autoComplete="off"
                          variant="outlined"
                          margin="dense"
                          size="small"
                          placeholder="0"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 14 }}
                        >
                          Descripción{" "}
                          <span style={{ fontSize: 10, marginLeft: 5 }}>
                            (Una descripción breve)
                          </span>
                          :
                        </b>
                        <TextField
                          name="description"
                          value={values.description}
                          error={values.errorDescription}
                          onChange={(event) =>
                            handleChange("description", event.target.value)
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
                          rows={3}
                          inputProps={{ maxLength }}
                          placeholder="Ingrese..."
                        />
                        <FormHelperText>
                          Máximo permitido de información{" "}
                          {`${values.description.length} / ${maxLength}`}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} sm={12} sx={{ marginTop: 3 }}>
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 18 }}
                        >
                          Ubicación del inmueble
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
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 14 }}
                        >
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
                            handleChange(
                              "descriptionLocation",
                              event.target.value
                            )
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
                          rows={3}
                          inputProps={{ maxLength }}
                          placeholder="Ingrese..."
                        />
                        <FormHelperText>
                          Máximo permitido de información{" "}
                          {`${values.descriptionLocation.length} / ${maxLength}`}
                        </FormHelperText>
                      </Grid>
                    </>
                  ) : activeStep === 1 ? (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      sx={{ padding: "0 10px" }}
                    >
                      <Grid container>
                        <Grid item xs={12} sm={12}>
                          <b
                            className={classes.cardTitleBlack}
                            style={{ fontSize: 18 }}
                          >
                            Compartir fotos del inmueble
                          </b>
                          <ParagraphTextPage
                            style={{ fontSize: 14, margin: "5px 0" }}
                          >
                            Puede subir hasta 10 fotos del inmueble, slecciona
                            las más importantes y de calidad para una buena
                            impresión.
                          </ParagraphTextPage>
                          <Divider sx={{ marginBottom: 3, width: "100%" }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <center>
                            <Button
                              component="label"
                              role={undefined}
                              variant="contained"
                              tabIndex={-1}
                              startIcon={<CloudUpload />}
                              sx={{ margin: "5px 0" }}
                              disabled={rowsImage.length >= 10 ? true : false}
                            >
                              Subir fotos
                              <VisuallyHiddenInput
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageUpload()}
                                multiple
                              />
                            </Button>
                          </center>
                        </Grid>
                        {rowsImage.length > 0 ? (
                          rowsImage
                            .filter((img) => img.imageUpload !== "delete")
                            .map((imageUrl, index) => {
                              let url = "";

                              if (
                                imageUrl.imageUpload &&
                                imageUrl.imageUpload !== "delete"
                              ) {
                                url = imageUrl.imagesNew;
                              } else {
                                url = `${urlServices}documents/images_properties/original/${imageUrl.images}`;
                              }

                              return (
                                <Grid item xs={6} sm={3} md={3} key={index}>
                                  <ImageListItem
                                    key={index}
                                    sx={{
                                      background: "#FAFAFA",
                                      margin: "5px 6px",
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
                                        padding: 5,
                                        position: "absolute",
                                        bottom: 0,
                                        background: "rgb(0,0,0,0.5)",
                                        width: "100%",
                                      }}
                                    >
                                      <Cancel
                                        sx={{
                                          color: "red",
                                          fontSize: 22,
                                          float: "right",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleDeleteImage(
                                            index,
                                            imageUrl.images
                                              ? imageUrl.images
                                              : imageUrl.imagesNew
                                          )
                                        }
                                      />
                                    </b>
                                  </ImageListItem>
                                  <FormControl>
                                    <FormControlLabel
                                      value={index} // Use index as value to identify the image
                                      checked={
                                        parseInt(imageUrl.main) === 1
                                          ? true
                                          : false
                                      }
                                      onChange={handleChangeImagePrincipal}
                                      control={
                                        <Radio
                                          sx={{
                                            "& .MuiSvgIcon-root": {
                                              fontSize: 22,
                                            },
                                          }}
                                        />
                                      }
                                      label="Foto principal"
                                    />
                                  </FormControl>
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
                                style={{
                                  height: 250,
                                  objectFit: "contain",
                                }}
                              />
                            </center>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  ) : activeStep === 2 ? (
                    <>
                      <Grid item xs={12} sm={12}>
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 18 }}
                        >
                          Selección de servicios
                        </b>
                        <ParagraphTextPage
                          style={{ fontSize: 14, margin: "5px 0" }}
                        >
                          Seleccione los servicios que el inmueble ofrece.
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
                                    backgroundColor: selectedItems.includes(
                                      item.id
                                    )
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
                    </>
                  ) : (
                    ""
                  )}
                </Grid>
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
                    <ParagraphTextPage
                      style={{ fontSize: 12, fontWeight: "bold" }}
                    >
                      Guardando registros...
                    </ParagraphTextPage>
                  </center>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <ButtonExit
                      startIcon={<Close />}
                      onClick={handleCloseDialog(true)}
                    >
                      SALIR DEL EDITAR
                    </ButtonExit>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      sx={{
                        fontSize: 12,
                        padding: 1,
                        width: 120,
                        color: blackColor,
                      }}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      startIcon={<ArrowBack />}
                    >
                      ATRÁS
                    </Button>
                    <ButtonStyle0
                      sx={
                        activeStep === steps.length - 1
                          ? {
                              fontSize: 12,
                              padding: 0,
                              width: 140,
                              background: "rgb(16, 185, 129)",
                            }
                          : { fontSize: 12, padding: 0, width: 120 }
                      }
                      onClick={
                        activeStep === steps.length - 1
                          ? submitForm
                          : handleNext
                      }
                      endIcon={
                        activeStep === steps.length - 1 ? (
                          <Save />
                        ) : (
                          <ArrowForward />
                        )
                      }
                    >
                      {activeStep === steps.length - 1
                        ? "GUARDAR"
                        : "CONTINUAR"}
                    </ButtonStyle0>
                  </Box>
                )}
              </React.Fragment>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {alert.openAlert ? (
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
      ) : (
        ""
      )}
    </Fragment>
  );
}
