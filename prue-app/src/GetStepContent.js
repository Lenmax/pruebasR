import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  CssBaseline,
  makeStyles,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
} from "@material-ui/core";

import AttachmentIcon from "@material-ui/icons/Attachment";
import Autocomplete from "@material-ui/lab/Autocomplete";

import * as dataAPI from "./data";
import FileUploader from "devextreme-react/file-uploader";
import notify from "devextreme/ui/notify";

const useStyles = makeStyles((theme) => ({
  mb1: {
    marginBottom: "1em",
  },
  w100: {
    width: "100%",
  },
  iconReq: {
    minWidth: "40px",
  },
  root: {
    justifyContent: "center",
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const GetStepContent = ({ step, handleNext, handleset }) => {
  const classes = useStyles();
  const [ProcedimientoSeleccionado, setProcedimientoSeleccionado] = useState(
    {}
  );
  const [TipoDocumentos, setTipoDocumentos] = useState([]);
  const [TipoDocumentoCompleto, setTipoDocumentoCompleto] = useState("");
  const [Procedimiento, setProcedimiento] = useState([]);
  const [Requisito, setRequisito] = useState([]);

  const [DatosInteresado, setDatosInteresado] = useState({});
  const [Expediente, setExpediente] = useState({});
  const [selectedFiles, setselectedFiles] = useState([]);

  //#region useEffect

  useEffect(() => {
    if (step == 2) {
      if (
        Expediente.tipodocumento === undefined ||
        Expediente.tipodocumento === ""
      ) {
        handleset(1);
        notify("Seleccione el tipo de documento para continuar.");
      } else if (
        Expediente.documentointeresado === undefined ||
        Expediente.documentointeresado === ""
      ) {
        handleset(1);
        notify("Ingrese su documento de identidad para continuar.");
      } else if (
        TipoDocumentos.find(
          (req) =>
            req.tipodocumentoidentidad ==
            (DatosInteresado.tipodocumentoidentidad == undefined
              ? Expediente.tipodocumento
              : DatosInteresado.tipodocumentoidentidad)
        ).digitos != Expediente.documentointeresado.length
      ) {
        handleset(1);
        notify("El documento ingresado no es valido");
      }
      if (Object.keys(DatosInteresado).length == 0) {
        handleset(1);
        notify("Ingrese sus datos para continuar.");
      } else if (
        DatosInteresado.email === undefined ||
        DatosInteresado.email === ""
      ) {
        handleset(1);
        notify("Ingrese su email para continuar.");
      } else if (
        DatosInteresado.telefono === undefined ||
        DatosInteresado.telefono === ""
      ) {
        handleset(1);
        handleset("Ingrese su telefono para continuar.");
      }
    }

    if (step == 3) {
      if (
        Requisito.find(
          (req) => req.procedimiento == ProcedimientoSeleccionado.procedimiento
        ) != undefined
      ) {
        var cantidadrequisitos = Requisito.find(
          (req) => req.procedimiento == ProcedimientoSeleccionado.procedimiento
        ).procedimientos.length;
        if (cantidadrequisitos != selectedFiles.length) {
          handleset(2);
          notify("Ingrese todos los documentos solicitados para continuar.");
        }
      }
    }

    console.log("de esta forma se ejecuta mas de una vez y se va acumulando");
  });

  useEffect(() => {
    //validaciones
    dataAPI.tipoDocumento().then((res) => {
      if (res.data.result != undefined) setTipoDocumentos(res.data.result);
    });
    dataAPI.Procedimiento().then((res) => {
      if (res.estado == 1) {
        notify(res.mensaje);
      } else setProcedimiento(res.data.result);
    });
    dataAPI.Requisito().then((res) => {
      //console.log(res);
      if (res.estado == 1) {
        notify(res.mensaje);
      } else {
        var hash = res.data.result.reduce(
            (p, c) => (
              p[c.procedimiento]
                ? p[c.procedimiento].push(c)
                : (p[c.procedimiento] = [c]),
              p
            ),
            {}
          ),
          newhash = Object.keys(hash).map((k) => ({
            procedimiento: k,
            procedimientos: hash[k],
          }));
        setRequisito(newhash);
      }
    });

    console.log("de esta forma solo se ejecuta una vez");
    return () => {
      //cleanup
    };
  }, []);

  //#endregion

  //Expediente
  //#region Expediente

  const handleTipoSelected = (item) => {
    setExpediente((prevState) => ({
      ...prevState,
      procedimiento: item.procedimiento,
    }));
    setProcedimientoSeleccionado(item);
    handleNext();
  };

  const guardarTipoDocumento = (item) => {
    setExpediente((prevState) => ({
      ...prevState,
      tipodocumento: item,
    }));
  };

  const guardardocumentoInteresado = (item) => {
    setExpediente((prevState) => ({
      ...prevState,
      documentointeresado: item,
    }));
    Buscarpersona(item);
  };

  const guardarTipoDocumentoCompleto = (item) => {
    setTipoDocumentoCompleto(item);
  };

  const guardarresponsablelegal = (item) => {
    setExpediente((prevState) => ({
      ...prevState,
      responsablelegal: item,
    }));
    handleset(2);
    handleset(1);
  };

  const Buscarpersona = (item) => {
    dataAPI.Persona(item).then((res) => {
      //console.log(res.data.result)
      if (res.data.result.length != 0) {
        setDatosInteresado((prevState) => ({
          ...prevState,
          dni: res.data.result[0].dni,
          ubigeo: res.data.result[0].ubigeo,
          nombre: res.data.result[0].nombre,
          tipodocumentoidentidad: res.data.result[0].tipodocumentoidentidad,
          direccion: res.data.result[0].direccion,
          telefono: res.data.result[0].telefono,
          email: res.data.result[0].email,
          genero: res.data.result[0].genero,
          estadocivil: res.data.result[0].estadocivil,
          fechanacimiento: res.data.result[0].fechanacimiento,
          ubigeonacimiento: res.data.result[0].ubigeonacimiento,
          fechadefuncion: res.data.result[0].fechadefuncion,
          usuario: res.data.result[0].usuario,
          estado: res.data.result[0].estado,
        }));
        guardarresponsablelegal(res.data.result[0].nombre);
      }
    });
  };

  const guardarTelefono = (item) => {
    setDatosInteresado((prevState) => ({
      ...prevState,
      telefono: item,
    }));
  };

  const guardarEmail = (item) => {
    setDatosInteresado((prevState) => ({
      ...prevState,
      email: item,
    }));
  };

  const guardarNombre = (item) => {
    setDatosInteresado((prevState) => ({
      ...prevState,
      nombre: item,
    }));
  };

  const guardarobservacionexpediente = (item) => {
    setExpediente((prevState) => ({
      ...prevState,
      observacion_expediente: item,
      observacion_historialexpediente: item,
    }));
  };

  const onSelectedFilesChanged = (e, index, procedimientorequisito) => {
    var archivos = {
      indice: index,
      archivo: e,
      procedimientorequisito: procedimientorequisito,
    };
    let newArr = [...selectedFiles]; // copying the old datas array
    let indicegeneral = selectedFiles.findIndex((item) => item.indice == index);
    newArr[indicegeneral] = archivos;
    if (indicegeneral != -1) {
      setselectedFiles(newArr);
    } else {
      setselectedFiles((prevArray) => [...prevArray, archivos]);
    }
  };
  //#endregion

  const Retornar = () => {
    handleset(2);
  };

  const onClick = () => {
    var fechaarchivo = new Date().getTime().toString();
    var archivosrequisito = selectedFiles.map(function (obj) {
      var resultado = {};
      resultado.procedimientorequisito = obj.procedimientorequisito;
      resultado.archivo = obj.archivo.value;
      return resultado;
    });

    var cadena_archivos = "";
    for (let index = 0; index < archivosrequisito.length; index++) {
      const element = archivosrequisito[index];
      cadena_archivos =
        cadena_archivos +
        fechaarchivo +
        "_" +
        element.archivo[0].name +
        "," +
        element.procedimientorequisito +
        ",";
    }

    setExpediente((prevState) => ({
      ...prevState,
      expediente: "EXP6",
      descripcion: "",
      detalle_expediente: "",
      periodo: new Date().getFullYear(),
      estadoexpediente: 1,
      tipoprioridad: 1,
      usuarioatiende: "Tramite",
      detalle_historialexpediente: "",
      tipoestadohistorialexpediente: 1,
      arreglo_historialarchivo: cadena_archivos,
      usuarioCreacion: "Tramite",
    }));

    var nuevoExpediente = {};
    nuevoExpediente.procedimiento = Expediente.procedimiento;
    nuevoExpediente.expediente = "EXP9";
    nuevoExpediente.documentointeresado = Expediente.documentointeresado;
    nuevoExpediente.responsablelegal = Expediente.responsablelegal;
    nuevoExpediente.descripcion = Expediente.descripcion ?? "";
    nuevoExpediente.detalle_expediente = Expediente.detalle_expediente ?? "";
    nuevoExpediente.periodo = Expediente.periodo ?? new Date().getFullYear();
    nuevoExpediente.observacion_expediente =
      Expediente.observacion_expediente ?? "";
    nuevoExpediente.estadoexpediente = Expediente.estadoexpediente ?? 1;
    nuevoExpediente.tipoprioridad = Expediente.tipoprioridad ?? 1;
    nuevoExpediente.tipodocumento = Expediente.tipodocumento ?? "";
    nuevoExpediente.usuarioatiende = Expediente.usuarioatiende ?? "Tramite";
    nuevoExpediente.detalle_historialexpediente =
      Expediente.detalle_historialexpediente ?? "";
    nuevoExpediente.observacion_historialexpediente =
      Expediente.observacion_historialexpediente ?? "";
    nuevoExpediente.tipoestadohistorialexpediente =
      Expediente.tipoestadohistorialexpediente ?? 1;
    nuevoExpediente.arreglo_historialarchivo =
      Expediente.arreglo_historialarchivo ?? cadena_archivos;
    nuevoExpediente.usuarioCreacion = Expediente.usuarioCreacion ?? "Tramite";

    var Persona = {};
    Persona.dni = Expediente.documentointeresado;
    Persona.ubigeo = DatosInteresado.ubigeo ?? null;
    Persona.nombre = DatosInteresado.nombre ?? null;
    Persona.tipodocumentoidentidad = Expediente.tipodocumento ?? null;
    Persona.direccion = DatosInteresado.direccion ?? null;
    Persona.telefono = DatosInteresado.telefono ?? null;
    Persona.email = DatosInteresado.email ?? null;
    Persona.genero = DatosInteresado.genero ?? null;
    Persona.estadocivil = DatosInteresado.estadocivil ?? null;
    Persona.fechanacimiento = DatosInteresado.fechanacimiento ?? null;
    Persona.ubigeonacimiento = DatosInteresado.ubigeonacimiento ?? null;
    Persona.fechadefuncion = DatosInteresado.fechadefuncion ?? null;
    Persona.usuario = DatosInteresado.usuario ?? "tramite";
    Persona.estado = DatosInteresado.estado ?? "A";

    //console.log(archivosrequisito);
    const data = new FormData();
    // bucle for para los elementos files,para que estos pasen al servidor
    for (let i = 0; i < archivosrequisito.length; i++) {
      data.append(
        "archivo",
        archivosrequisito[i].archivo[0],
        fechaarchivo + "_" + archivosrequisito[i].archivo[0].name
      );
    }

    fetch("http://10.10.42.204:4030/api/subir-archivo", {
      method: "POST",
      body: data,
    }) //.then(response => response.json())
      .then((data) => {
        console.log("Archivo se subio correctamente", data);
        dataAPI.guardarNuevoExpediente(nuevoExpediente).then((res) => {
          if (res.estado == 1) {
            notify(
              "Ocurrio un error al momento de guardar el tramite verifique sus datos y vuelva a intentarlo. " +
                "Error: " +
                res.mensaje
            );
          } else {
            dataAPI.guardarNuevoPersona(Persona).then((persona) => {
              if (persona.estado == 1) {
                notify(
                  "Ocurrio un error al momento de guardar el tramite verifique sus datos y vuelva a intentarlo. " +
                    persona.mensaje
                );
              } else {
                setProcedimientoSeleccionado({});
                setTipoDocumentoCompleto("");
                setDatosInteresado({});
                setExpediente({});
                setselectedFiles([]);

                handleset(0);
                notify(
                  "Tramite guardado correctamente Su expediente es." +
                    nuevoExpediente.expediente
                );
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        notify(
          "Error al subir los archivos al servidor revise sus archivos he intente nuevamente."
        );
      });
  };

  switch (step) {
    case 0:
      return (
        <>
          <Grid item xs={12}>
            <Typography variant="subtitle2" align="right">
              Buscador
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Codigo</TableCell>
                    <TableCell align="center">Tramite</TableCell>
                    <TableCell align="center">Requisitos</TableCell>
                    <TableCell align="center">Tiempo Estimado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Procedimiento.map((item) => (
                    <TableRow
                      key={item.procedimiento}
                      hover
                      onClick={() => handleTipoSelected(item)}
                    >
                      <TableCell aling="center">{item.codigo}</TableCell>
                      <TableCell aling="center">{item.denominacion}</TableCell>

                      <TableCell aling="center">
                        <List dense>
                          {Requisito.find(
                            (req) => req.procedimiento == item.procedimiento
                          ) &&
                            Requisito.find(
                              (req) => req.procedimiento == item.procedimiento
                            ).procedimientos.map((req) => (
                              <ListItem key={req.procedimientorequisito}>
                                <ListItemIcon className={classes.iconReq}>
                                  <AttachmentIcon />
                                </ListItemIcon>
                                <ListItemText
                                  secondary={
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="textPrimary"
                                    >
                                      {req.tbRequisito_descripcion}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            ))}
                        </List>
                      </TableCell>
                      <TableCell aling="center">
                        {item.tiempoestimado}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      );
    case 1:
      return (
        <>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="TipoDocumento"
              onChange={(event, newValue) => {
                if (newValue != null) {
                  guardarTipoDocumento(newValue.tipodocumentoidentidad);
                  guardarTipoDocumentoCompleto(newValue.descripcion);
                }
              }}
              options={TipoDocumentos}
              getOptionLabel={(option) => option.descripcion}
              value={{ descripcion: TipoDocumentoCompleto ?? "" }}
              className={classes.w100}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo Documento"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="NroDocumento"
              label="Nro de Documento"
              variant="outlined"
              defaultValue={Expediente.documentointeresado ?? ""}
              fullWidth
              onBlur={(event) => {
                guardardocumentoInteresado(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Nombre"
              label="Nombre"
              variant="outlined"
              fullWidth
              defaultValue={DatosInteresado.nombre ?? ""}
              onBlur={(event) => {
                guardarNombre(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="Telefono"
              label="Telefono"
              variant="outlined"
              type="number"
              fullWidth
              //value={DatosInteresado.telefono}
              defaultValue={DatosInteresado.telefono ?? ""}
              onBlur={(event) => {
                guardarTelefono(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="Email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              //value={DatosInteresado.email}
              defaultValue={DatosInteresado.email ?? ""}
              onBlur={(event) => {
                guardarEmail(event.target.value);
              }}
            />
          </Grid>
        </>
      );
    case 2:
      return (
        <>
          <List dense>
            {Requisito.find(
              (req) =>
                req.procedimiento == ProcedimientoSeleccionado.procedimiento
            ) &&
              Requisito.find(
                (req) =>
                  req.procedimiento == ProcedimientoSeleccionado.procedimiento
              ).procedimientos.map((req, index) => (
                <ListItem key={req.procedimientorequisito}>
                  <ListItemIcon className={classes.iconReq}>
                    <AttachmentIcon />
                  </ListItemIcon>
                  <ListItemText
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        <Grid container justify="center" alignItems="center">
                          <Grid item xs={12} sm={6}>
                            {req.tbRequisito_descripcion}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <div className="dx-fieldset"></div>
                            <div className="fileuploader-container">
                              <FileUploader
                                selectButtonText="Seleccionar Archivo"
                                onValueChanged={(event) => {
                                  onSelectedFilesChanged(
                                    event,
                                    index,
                                    req.procedimientorequisito
                                  );
                                }}
                                value={
                                  typeof selectedFiles.find(
                                    (item) => item.indice == index
                                  ) !== "undefined"
                                    ? selectedFiles.find(
                                        (item) => item.indice == index
                                      ).archivo.value
                                    : []
                                }
                                labelText=""
                                accept="image/*"
                                uploadMode="useForm"
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </>
      );
    case 3:
      return (
        <>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" align="center">
              Resumen Expediente
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography variant="h6" align="left">
              Procedimiento: {ProcedimientoSeleccionado.denominacion}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography variant="h6" align="left">
              Datos Personales:
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle2" align="left">
              Nombre completo: {DatosInteresado.nombre}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" align="left">
              Teléfono: {DatosInteresado.telefono}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" align="left">
              Correo Electrónico: {DatosInteresado.email}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography variant="h6" align="left">
              Requisitos:
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <List dense>
              {Requisito.find(
                (req) =>
                  req.procedimiento == ProcedimientoSeleccionado.procedimiento
              ) &&
                Requisito.find(
                  (req) =>
                    req.procedimiento == ProcedimientoSeleccionado.procedimiento
                ).procedimientos.map((req, index) => (
                  <ListItem key={req.procedimientorequisito}>
                    <ListItemIcon className={classes.iconReq}>
                      <AttachmentIcon />
                    </ListItemIcon>
                    <ListItemText
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          <Grid container justify="center" alignItems="center">
                            <Grid item xs={12} sm={6}>
                              {req.tbRequisito_descripcion}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {typeof selectedFiles.find(
                                (item) => item.indice == index
                              ) !== "undefined"
                                ? selectedFiles.find(
                                    (item) => item.indice == index
                                  ).archivo.value[0].name
                                : ""}
                            </Grid>
                          </Grid>
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="observacion_expediente"
              label="Observaciones"
              variant="outlined"
              fullWidth
              defaultValue={Expediente.observacion_expediente ?? ""}
              onBlur={(event) => {
                guardarobservacionexpediente(event.target.value);
              }}
            />
          </Grid>

          <Grid container item xs={12} justify="center">
            <Button onClick={Retornar} className={classes.button}>
              {" "}
              {"Paso Anterior"}{" "}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onClick}
              className={classes.button}
            >
              {"Finalizar"}
            </Button>
          </Grid>
        </>
      );
    default:
      return "Desconocido";
  }
};

export default GetStepContent;
