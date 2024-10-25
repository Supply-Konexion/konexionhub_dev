import React, { useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import axios from "axios";
import {
  Grid,
  Card,
  TextField,
  Button,
  ImageListItem,
  Divider,
  Alert,
  Slide,
  Snackbar,
  CircularProgress,
  Backdrop,
} from "@mui/material";

import { SpaceDashboard, Close, CloudUpload, Save } from "@mui/icons-material";

import noimage from "assets/img/noimage.jpeg";

import { cardBodyStyle } from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function PageHomeAdmin(props) {
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
      values: [4, 5, 6, 7],
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
        let imagesArray, buttonsArray;

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

        if (section.buttons) {
          try {
            // Intenta parsear `section.buttons` si es una cadena JSON
            buttonsArray = JSON.parse(section.buttons);
          } catch (e) {
            console.error("Error parsing images JSON:", e);
            buttonsArray = [];
          }

          // Verifica que `buttonsArray` es un array
          if (!Array.isArray(buttonsArray)) {
            buttonsArray = [];
          }
        } else {
          buttonsArray = [];
        }

        return {
          ...section,
          images: imagesArray,
          buttons: buttonsArray,
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

        return uploadImage(section.id, imagesToUpload);
      });

      // Esperar a que todas las imágenes se suban
      await Promise.all(uploadPromises);

      // Crear promesas para actualizar los datos
      const updatePromises = rows.map((section) => {
        const dataValue = {
          textMain: section.textMain,
          textSecondary: section.textSecondary,
          buttons: section.buttons ? JSON.stringify(section.buttons) : null,
        };

        return axios.put(
          `${urlServices}post-templates/${section.id}`,
          dataValue,
          {
            headers: { Authorization: `Bearer ${keyAuthorization}` },
          }
        );
      });

      // Esperar a que todas las actualizaciones se completen
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

  const uploadImage = async (id, images) => {
    const formData = new FormData();
    formData.append("id", id);

    // Función para manejar la eliminación secuencial
    const deleteImages = async (images) => {
      for (const image of images) {
        if (image.images && image.imageUpload === "delete") {
          try {
            const response = await axios.put(
              `${urlServices}post-templates/deleteUImagesTemplate/${id}`,
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

    // Añadir archivos al FormData
    const addFilesToFormData = (images) => {
      images.forEach((image) => {
        if (image.imageUpload && image.imageUpload !== "delete") {
          // Verifica que image.imageUpload es un objeto File o Blob
          formData.append("files", image.imageUpload);
        }
      });
    };

    try {
      await deleteImages(images);
      addFilesToFormData(images);

      if (formData.has("files")) {
        await axios.post(
          `${urlServices}post-templates/uploadImagesTemplate`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${keyAuthorization}`,
            },
          }
        );
      }
    } catch (error) {
      console.error(
        "Error en el proceso de carga y eliminación de imágenes:",
        error.response ? error.response.data : error.message
      );
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

  const handleChangeButton = (sectionId, field) => (event) => {
    const updatedSections = rows.map((section) => {
      if (section.id === sectionId) {
        const updatedButtons = section.buttons.map((button) => {
          if (field === "button1Text") {
            if (button.button1Text) {
              // Actualizar el texto del botón 1
              return { ...button, button1Text: event.target.value };
            }
          } else if (field === "button2Text") {
            if (button.button2Text) {
              // Actualizar el texto del botón 2
              return { ...button, button2Text: event.target.value };
            }
          }
          return button; // No actualiza si el campo no coincide
        });

        return { ...section, buttons: updatedButtons };
      }
      return section; // Devuelve la sección sin cambios si no coincide
    });

    setRows(updatedSections);
    setDisabled(false);
  };

  const handleImageUpload = (sectionId) => async (event) => {
    const file = event.target.files[0];
    if (!file) return;

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
          // Obtén la URL para mostrar la imagen (sin redimensionar)
          const imageUrl = URL.createObjectURL(file);

          const updatedSections = rows.map((section) => {
            if (section.id === sectionId) {
              // Parsear `images` si ya existe
              const existingImages = section.images ? section.images : [];

              // Crear el nuevo objeto de imagen
              const newImage = {
                imagesNew: imageUrl,
                imageUpload: file,
              };

              // Agregar la nueva imagen al array de imágenes existentes
              const updatedImages = [...existingImages, newImage];

              // Actualizar la sección con las imágenes actualizadas
              return { ...section, images: updatedImages };
            }
            return section;
          });
          // Actualizar el estado
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

  const handleDeleteImage = (sectionId, imageIndex) => {
    const updatedSections = rows.map((section) => {
      if (section.id === sectionId) {
        // Parsear `images` si ya existe
        const existingImages = section.images || [];

        // Modificar la imagen en el índice especificado
        const updatedImages = existingImages.map((image, index) => {
          if (image.images === imageIndex || image.imagesNew === imageIndex) {
            // Marcar la imagen para eliminar con `imageUpload: "delete"`
            return { ...image, imageUpload: "delete" };
          }
          return image;
        });

        // Actualizar la sección con las imágenes modificadas
        return { ...section, images: updatedImages };
      }
      return section;
    });

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
          Inicio
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
          <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: 2 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
              Imágenes subidas:
            </b>
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              {rows
                .filter((section) => section.sections === 4)
                .map((section4) => {
                  // Usa el array de imágenes directamente y asegura que sea un array
                  let dataImage = section4.images || [];

                  // Filtra las imágenes para excluir aquellas marcadas con `imageUpload: "delete"`
                  dataImage = dataImage.filter(
                    (section0) => section0.imageUpload !== "delete"
                  );

                  // Mapea los elementos para construir los objetos con URLs e imágenes
                  dataImage = dataImage.map((element) => {
                    // Usa un operador ternario para seleccionar la URL correcta
                    return element.imagesNew
                      ? [
                          { url: element.imagesNew },
                          { images: element.imagesNew },
                        ]
                      : [
                          {
                            url: `${urlServices}documents/images_templates/${element.images}`,
                          },
                          { images: element.images },
                        ];
                  });

                  return (
                    <>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        sx={{ padding: "0 10px" }}
                      >
                        <Grid container>
                          {dataImage.length > 0 ? (
                            dataImage.map((imageUrl, index) => (
                              <Grid item xs={12} sm={6} md={6}>
                                <ImageListItem
                                  key={index}
                                  sx={{
                                    padding: 1,
                                  }}
                                >
                                  <img
                                    src={imageUrl[0].url}
                                    alt={`image${index}`}
                                    loading="lazy"
                                    style={{
                                      width: 200,
                                      height: 130,
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
                                      handleDeleteImage(
                                        section4.id,
                                        imageUrl[1].images
                                      )
                                    }
                                  >
                                    Eliminar&nbsp;
                                    <Close sx={{ fontSize: 14 }} />
                                  </b>
                                </ImageListItem>
                              </Grid>
                            ))
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
                            size="small"
                          >
                            Subir imágen para el SLIDER
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={handleImageUpload(4)}
                              hidden
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
                              value={section4.textMain}
                              onChange={handleChange(section4.id, "textMain")}
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
                              value={section4.textSecondary}
                              onChange={handleChange(
                                section4.id,
                                "textSecondary"
                              )}
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
                      <Grid item xs={12} sm={6} md={6}>
                        {" "}
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Grid container>
                          <Grid item xs={12} sm={6} md={6} sx={{ padding: 1 }}>
                            <TextField
                              id="outlined-basic"
                              label="Botón 1"
                              variant="outlined"
                              value={section4.buttons[0].button1Text}
                              onChange={handleChangeButton(
                                section4.id,
                                "button1Text"
                              )}
                              type="text"
                              autoComplete="off"
                              margin="dense"
                              fullWidth
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} sx={{ padding: 1 }}>
                            <TextField
                              id="outlined-basic"
                              label="Botón 2"
                              variant="outlined"
                              value={section4.buttons[1].button2Text}
                              onChange={handleChangeButton(
                                section4.id,
                                "button2Text"
                              )}
                              type="text"
                              autoComplete="off"
                              margin="dense"
                              fullWidth
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 2 }}>
          <b className={classes.cardTitleBlack} style={{ fontSize: 18 }}>
            Sección 2
          </b>
          <Divider sx={{ marginBottom: 4, width: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={2}>
            {rows
              .filter((section) => section.sections === 5)
              .map((section5) => {
                return (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        label="Título"
                        variant="outlined"
                        value={section5.textMain}
                        onChange={handleChange(section5.id, "textMain")}
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
                        value={section5.textSecondary}
                        onChange={handleChange(section5.id, "textSecondary")}
                        type="text"
                        autoComplete="off"
                        margin="dense"
                        fullWidth
                      />
                    </Grid>
                  </>
                );
              })}
          </Grid>

          <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 4 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 18 }}>
              Sección 3
            </b>
            <Divider sx={{ marginBottom: 4, width: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={2}>
              {rows
                .filter((section) => section.sections === 6)
                .map((section6) => {
                  return (
                    <>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          label="Título"
                          variant="outlined"
                          value={section6.textMain}
                          onChange={handleChange(section6.id, "textMain")}
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
                          value={section6.textSecondary}
                          onChange={handleChange(section6.id, "textSecondary")}
                          type="text"
                          autoComplete="off"
                          margin="dense"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6} sm={4} md={4} sx={{ padding: 1 }}>
                        <TextField
                          id="outlined-basic"
                          label="Botón"
                          variant="outlined"
                          value={section6.buttons[0].button1Text}
                          onChange={handleChangeButton(
                            section6.id,
                            "button1Text"
                          )}
                          type="text"
                          autoComplete="off"
                          margin="dense"
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    </>
                  );
                })}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 4 }}>
            <b className={classes.cardTitleBlack} style={{ fontSize: 18 }}>
              Sección 4
            </b>
            <Divider sx={{ marginBottom: 4, width: "100%" }} />
          </Grid>
          {rows
            .filter((section) => section.sections === 7)
            .map((section7) => {
              // Usa el array de imágenes directamente y asegura que sea un array
              let dataImage7 = section7.images || [];

              // Filtra las imágenes para excluir aquellas marcadas con `imageUpload: "delete"`
              dataImage7 = dataImage7.filter(
                (section0) => section0.imageUpload !== "delete"
              );

              // Mapea los elementos para construir los objetos con URLs e imágenes
              dataImage7 = dataImage7.map((element) => {
                // Usa un operador ternario para seleccionar la URL correcta
                return element.imagesNew
                  ? [{ url: element.imagesNew }, { images: element.imagesNew }]
                  : [
                      {
                        url: `${urlServices}documents/images_templates/${element.images}`,
                      },
                      { images: element.images },
                    ];
              });
              return (
                <>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      label="Parrafo"
                      variant="outlined"
                      value={section7.textSecondary}
                      onChange={handleChange(section7.id, "textSecondary")}
                      type="text"
                      rows={2}
                      multiline
                      autoComplete="off"
                      margin="dense"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid container sx={{ padding: "0 15px" }}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ padding: "0 10px" }}
                      >
                        <Grid container>
                          <Grid item xs={12} sm={12} md={12}>
                            <center>
                              <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUpload />}
                                sx={{ margin: "8px 0" }}
                                size="small"
                              >
                                Subir imágen pulicitaria
                                <input
                                  type="file"
                                  accept="image/jpeg,image/png,image/webp"
                                  onChange={handleImageUpload(7)}
                                  hidden
                                />
                              </Button>
                            </center>
                          </Grid>
                          {dataImage7.length > 0
                            ? dataImage7.map((imageUrl, index) => (
                                <Grid item xs={4} sm={2} md={2}>
                                  <ImageListItem
                                    key={index}
                                    sx={{
                                      padding: 1,
                                    }}
                                  >
                                    <img
                                      src={imageUrl[0].url}
                                      alt={`image${index}`}
                                      loading="lazy"
                                      style={{
                                        width: 200,
                                        height: 130,
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
                                      }}
                                      onClick={() =>
                                        handleDeleteImage(
                                          section7.id,
                                          imageUrl[1].images
                                        )
                                      }
                                    >
                                      Eliminar&nbsp;
                                      <Close sx={{ fontSize: 14 }} />
                                    </b>
                                  </ImageListItem>
                                </Grid>
                              ))
                            : ""}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              );
            })}
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
