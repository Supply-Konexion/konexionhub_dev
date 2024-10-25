import React, { useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Card,
  TextField,
  Button,
  ImageListItem,
  Divider,
  Alert,
  Snackbar,
  Slide,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import axios from "axios";
import {
  SpaceDashboard,
  Close,
  CloudUpload,
  Save,
  VisibilityOff,
  Visibility
} from "@mui/icons-material";

import noimage from "assets/img/noimage.jpeg";

import { cardBodyStyle } from "components/cardBodyStyle";

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

export default function PageAboutAdmin(props) {
  const classes = useStyles();

  const [rows, setRows] = React.useState([]);
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [mensageSystem, setMensageSystem] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const [openLoader, setOpenLoader] = React.useState(false);

  const { urlServices, UserAuth } = React.useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchData();
  }, []);

  const fetchData = async () => {
    setOpenLoader(true);

    const valueData = {
      values: [1, 2, 3],
    };

    try {
      const response = await axios.post(
        `${urlServices}post-templates/sections`,
        valueData,
        {
          headers: {
            Authorization: "Bearer " + keyAuthorization,
          },
        }
      );

      // Asegúrate de transformar el campo `images` en un array
      const transformedRows = response.data.map((section) => {
        let imagesArray;

        if (section.images) {
          try {
            // Intenta parsear `section.images` si es una cadena JSON
            imagesArray = JSON.parse(section.images);
          } catch (e) {
            console.error("Error parsing images JSON:", e);
            imagesArray = [];
          }

          // Verifica que `imagesArray` es un array
          if (!Array.isArray(imagesArray)) {
            imagesArray = [];
          }
        } else {
          imagesArray = [];
        }

        return {
          ...section,
          images: imagesArray, // Asegúrate de que `images` es un array
          imageDisabled: imagesArray.length > 0 ? true : false,
        };
      });

      setRows(transformedRows);
      setOpenLoader(false);
    } catch (error) {
      setOpenLoader(false);
      if (error.response && error.response.status === 401) {
        setMensageSystem("La sesión ha expirado, vuelva a iniciar sesión ...");
        setError(true);

        setTimeout(() => {
          localStorage.clear();
          setReturnLogin(true);
        }, 4000);
      } else {
        setOpenLoader(false);
        setRows([]);
      }
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      // Recopilar todas las promesas de carga de imágenes
      const uploadPromises = rows.flatMap((section) => {
        const imagesToUpload = section.images.filter(
          (image) => image.imageUpload
        );

        if (imagesToUpload.length > 0)
          return uploadImage(section.id, imagesToUpload);
      });

      // Esperar a que todas las imágenes se suban
      await Promise.all(uploadPromises);

      // Luego, crea una lista de promesas para la actualización de datos
      const updatePromises = rows.map((section) => {
        const dataValue = {
          textMain: section.textMain,
          textSecondary: section.textSecondary,
        };

        return axios.put(
          `${urlServices}post-templates/${section.id}`,
          dataValue,
          {
            headers: { Authorization: "Bearer " + keyAuthorization },
          }
        );
      });

      // Espera a que todas las actualizaciones se completen
      await Promise.all(updatePromises);

      fetchData();

      setOpenAlert(true);
      setErrorAlert("success");
      setMensaje("Cambios guardados con éxito");
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setMensageSystem("La sesión ha expirado, vuelva a iniciar sesión ...");
        setError(true);

        setTimeout(() => {
          localStorage.clear();
          setReturnLogin(true);
        }, 4000);
      } else {
        setMensaje("Error al guardar los cambios.");
        setOpenAlert(true);
        setErrorAlert("error");
      }
    } finally {
      setDisabled(true);
    }
  };

  const submitStatus = (id) => async () => {
    try {
      const statusValue = rows.find((value) => value.id === id);

      const dataValue = {
        status: statusValue.status === 1 ? 0 : 1,
      };

      await axios.put(`${urlServices}post-templates/${id}`, dataValue, {
        headers: { Authorization: "Bearer " + keyAuthorization },
      });

      fetchData();

      setOpenAlert(true);
      setErrorAlert("success");
      setMensaje("Cambios guardados con éxito");
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setMensageSystem("La sesión ha expirado, vuelva a iniciar sesión ...");
        setError(true);

        setTimeout(() => {
          localStorage.clear();
          setReturnLogin(true);
        }, 4000);
      } else {
        setMensaje("Error al guardar los cambios.");
        setOpenAlert(true);
        setErrorAlert("error");
      }
    }
  };

  const uploadImage = async (id, images) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("valueDelete", true);

    const deleteRequests = [];

    images.forEach((image) => {
      if (image.imageUpload === "delete") {
        // Preparar solicitud PUT para eliminar imágenes
        deleteRequests.push(
          axios.put(
            `${urlServices}post-templates/deleteUImagesTemplate/${id}`,
            {
              imageName: image.images,
            },
            {
              headers: {
                Authorization: `Bearer ${keyAuthorization}`,
              },
            }
          )
        );
      } else {
        // Agregar archivo a formData
        formData.append("files", image.imageUpload);
      }
    });

    try {
      // Esperar a que se completen todas las solicitudes de eliminación
      await Promise.all(deleteRequests);

      if (formData.has("files")) {
        // Solo subir imágenes si hay archivos en formData
        await axios({
          method: "post",
          url: `${urlServices}post-templates/uploadImagesTemplate`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${keyAuthorization}`,
          },
        });
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const handleChange = (sectionId, field) => (event) => {
    const updatedSections = rows.map((section) => {
      // Encuentra la sección que corresponde al sectionId
      if (section.id === sectionId) {
        return {
          ...section,
          [field]: event.target.value, // Actualiza el campo específico
        };
      }
      return section; // Devuelve la sección sin cambios si no coincide
    });

    setRows(updatedSections);
    setDisabled(false);
  };

  const handleImageUpload = (sectionId) => async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Verifica el tipo de archivo
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/webp")
    ) {
      // Verifica el tamaño del archivo (1 MB = 1,000,000 bytes)
      if (file.size <= 1000000) {
        try {
          // No redimensionamos la imagen, solo obtenemos la URL para mostrar
          const imageUrl = URL.createObjectURL(file);

          const updatedSections = rows.map((section) => {
            if (section.id === sectionId) {
              const existingImages = section.images ? section.images : [];

              // Crear el nuevo objeto de imagen
              const newImage = {
                imagesNew: imageUrl,
                imageUpload: file,
              };

              // Agregar la nueva imagen al array de imágenes existentes
              const updatedImages = [...existingImages, newImage];

              // Actualizar la sección con las imágenes actualizadas
              return { ...section, images: updatedImages, imageDisabled: true };
            }
            return section;
          });

          setRows(updatedSections);
          setDisabled(false);
        } catch (error) {
          setOpenAlert(true);
          setErrorAlert("error");
          setMensaje("Error al procesar la imagen.");
        }
      } else {
        setOpenAlert(true);
        setErrorAlert("error");
        setMensaje("El tamaño del archivo no debe exceder 1 MB.");
      }
    } else {
      setOpenAlert(true);
      setErrorAlert("error");
      setMensaje("Solo se permiten archivos JPG y PNG.");
    }
  };

  const handleDeleteImage = (sectionId) => {
    const updatedSections = rows.map((section) => {
      if (section.id === sectionId) {
        // Asegúrate de que `section.images` siempre sea un array
        const existingImages = section.images || [];

        // Mapea las imágenes para actualizar según las condiciones
        const updatedImages = existingImages
          .filter((image) => !image.imagesNew) // Elimina las imágenes con `imagesNew`
          .map((image) => {
            // Marca la imagen para eliminar si coincide con la condición
            if (image.images === section.images[0].images) {
              return { ...image, imageUpload: "delete" };
            }
            // Si no cumple con la condición, la dejamos tal cual
            return image;
          });

        // Actualiza la sección con las imágenes modificadas
        return { ...section, images: updatedImages, imageDisabled: false };
      }
      return section;
    });

    // Actualiza el estado con las secciones modificadas
    setRows(updatedSections);
    setDisabled(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={8}>
        {error ? <Alert severity="error">{mensageSystem}</Alert> : ""}
        <div className={classes.cardTitleBlack}>
          <SpaceDashboard className={classes.iconFilter} /> Plantilla web de
          Saber Más
        </div>
      </Grid>
      <Grid item xs={12} sm={4} md={4} sx={{ float: "right" }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<Save />}
          disabled={disabled}
          onClick={submitForm}
        >
          Guardar todos los cambios
        </Button>
      </Grid>
      <Card sx={{ padding: "15px 20px", margin: "10px 0" }} variant="outlined">
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 18 }}>
              Sección 1
            </b>
            <Divider sx={{ marginBottom: 4, width: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: 1 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              Imágen subida:
            </b>
          </Grid>
          {rows
            .filter((section) => section.sections === 1)
            .map((section1) => {
              let dataImge = section1.images || [];
              let hideImage = 0;
              let img = noimage;

              // Si no hay imágenes, asignar `noimage` y ocultar la imagen
              if (dataImge.length === 0) {
                hideImage = 1;
              } else {
                hideImage = 1;
                // Mapear los elementos para construir las URLs
                dataImge.map((element) => {
                  if (element.imageUpload !== "delete") {
                    hideImage = 0;
                    img = element.imagesNew
                      ? element.imagesNew
                      : `${urlServices}documents/images_templates/${element.images}`;
                  }
                });
              }

              return (
                <>
                  <Grid item xs={12} sm={6} md={6} sx={{ padding: "0 5px" }}>
                    <ImageListItem
                      key={section1.id}
                      sx={{
                        padding: 4,
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      <img
                        src={img}
                        alt="image1"
                        loading="lazy"
                        style={{
                          width: 350,
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
                          display: hideImage === 1 ? "none" : "block",
                        }}
                        onClick={() => handleDeleteImage(section1.id)}
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
                        disabled={section1.imageDisabled}
                        size="small"
                      >
                        Subir imágen
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageUpload(1)}
                          // multiple
                        />
                      </Button>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          label="Título"
                          variant="outlined"
                          value={section1.textMain}
                          onChange={handleChange(section1.id, "textMain")}
                          type="text"
                          autoComplete="off"
                          margin="dense"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          label="Párrafo"
                          variant="outlined"
                          value={section1.textSecondary}
                          onChange={handleChange(section1.id, "textSecondary")}
                          type="text"
                          autoComplete="off"
                          margin="dense"
                          multiline
                          rows={10}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              );
            })}

          <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 4 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 18 }}>
              Sección 2
            </b>
            <Divider sx={{ marginBottom: 4, width: "100%" }} />
          </Grid>
          {rows
            .filter((section) => section.sections === 2)
            .map((section2) => {
              let dataImge2 = section2.images || [];
              let hideImage2 = 0;
              let img2 = noimage;

              // Si no hay imágenes, asignar `noimage` y ocultar la imagen
              if (dataImge2.length === 0) {
                hideImage2 = 1;
              } else {
                hideImage2 = 1;
                // Mapear los elementos para construir las URLs
                dataImge2.map((element) => {
                  if (element.imageUpload !== "delete") {
                    hideImage2 = 0;
                    img2 = element.imagesNew
                      ? element.imagesNew
                      : `${urlServices}documents/images_templates/${element.images}`;
                  }
                });
              }

              return (
                <>
                  <Grid item xs={12} sm={6} md={6} sx={{ paddingTop: 12 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          label="Título"
                          variant="outlined"
                          value={section2.textMain}
                          onChange={handleChange(section2.id, "textMain")}
                          type="text"
                          autoComplete="off"
                          margin="dense"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          label="Subtítulo"
                          variant="outlined"
                          value={section2.textSecondary}
                          onChange={handleChange(section2.id, "textSecondary")}
                          type="text"
                          autoComplete="off"
                          margin="dense"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Grid container sx={{ padding: "0 15px" }}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ marginBottom: 2 }}
                      >
                        <b
                          className={classes.cardTitleBlack}
                          style={{ fontSize: 14 }}
                        >
                          Imágen subida:
                        </b>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ padding: "0 5px" }}
                      >
                        <ImageListItem
                          key={section2.id}
                          sx={{
                            padding: 4,
                            border: "1px solid rgba(0, 0, 0, 0.12)",
                          }}
                        >
                          <img
                            src={img2}
                            alt="image2"
                            loading="lazy"
                            style={{
                              width: 350,
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
                              display: hideImage2 === 1 ? "none" : "block",
                            }}
                            onClick={() => handleDeleteImage(section2.id)}
                          >
                            Eliminar&nbsp;
                            <Close sx={{ fontSize: 14 }} />
                          </b>
                        </ImageListItem>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <center>
                          <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUpload />}
                            sx={{ marginTop: 1 }}
                            disabled={section2.imageDisabled}
                            size="small"
                          >
                            Subir imágen
                            <VisuallyHiddenInput
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={handleImageUpload(2)}
                              // multiple
                            />
                          </Button>
                        </center>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              );
            })}

          <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 4 }}>
            <Grid container spacing={2}>
              {rows
                .filter((section) => section.sections === 3)
                .map((section3) => (
                  <>
                    <Grid item xs={12} sm={12} md={12}>
                      <b
                        className={classes.cardTitleBlack}
                        style={{ fontSize: 18 }}
                      >
                        Sección 3{" "}
                        <Button
                          variant="contained"
                          startIcon={section3.status === 1 ? <VisibilityOff /> : <Visibility />}
                          sx={{ fontSize: 10 }}
                          size="small"
                          color={section3.status === 1 ? "error" : "success"}
                          onClick={submitStatus(section3.id)}
                        >
                          {section3.status === 1
                            ? "Ocultar sección"
                            : "Habilitar sección"}
                        </Button>
                      </b>
                      <Divider sx={{ marginBottom: 2, width: "100%" }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        label="Título"
                        variant="outlined"
                        value={section3.textMain}
                        onChange={handleChange(section3.id, "textMain")}
                        type="text"
                        autoComplete="off"
                        margin="dense"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        label="Subtítulo"
                        variant="outlined"
                        value={section3.textSecondary}
                        onChange={handleChange(section3.id, "textSecondary")}
                        type="text"
                        autoComplete="off"
                        margin="dense"
                        fullWidth
                      />
                    </Grid>
                  </>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Slide direction="up" in={openAlert} mountOnEnter unmountOnExit>
          <Alert
            onClose={handleClose}
            severity={errorAlert === "error" ? "error" : "success"}
            elevation={6}
            variant="filled"
          >
            {mensaje}
          </Alert>
        </Slide>
      </Snackbar>
    </Grid>
  );
}
