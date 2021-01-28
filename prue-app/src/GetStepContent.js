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
} from "@material-ui/core";

import AttachmentIcon from "@material-ui/icons/Attachment";
import Autocomplete from "@material-ui/lab/Autocomplete";

//import { requisitoTipoTramite } from "./data";
import * as dataAPI from './data';
import FileUploader from 'devextreme-react/file-uploader';
import Button from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';

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
}));

const GetStepContent = ({ step, handleNext, handleBack }) => {
  const classes = useStyles();
  const [ProcedimientoSeleccionado, setProcedimientoSeleccionado] = useState({});
  const [TipoDocumentos, setTipoDocumentos] = useState([])
  const [TipoDocumentoCompleto, setTipoDocumentoCompleto] = useState("")
  const [Procedimiento, setProcedimiento] = useState([]);
  const [Requisito, setRequisito] = useState([]);

  const [DatosInteresado, setDatosInteresado] = useState({});

  var nuevoExpediente = { procedimiento: "", expediente: "EXP2", documentointeresado: "", responsablelegal:"", descripcion:"", detalle_expediente:"", periodo:"", 
  observacion_expediente: "", estadoexpediente: 0, tipoprioridad: 1, tipodocumento: "", dependenciaorigen:"", dependenciadestino: "", usuarioatiende:"",
  detalle_historialtramite: "", observacion_historialtramite:"", tipoestadohistorialtramite: 1, arreglo_historialarchivo:"", usuarioCreacion:""};

  const [Expediente, setExpediente] = useState(nuevoExpediente);
  const [selectedFiles, setselectedFiles] = useState([]);

//#region useEffect

  useEffect(() => {
    console.log("de esta forma se ejecuta mas de una vez y se va acumulando");
  })

  useEffect(() => {
    dataAPI.tipoDocumento().then((res)=>{ 
      setTipoDocumentos(res.data.result);
    }) 
    dataAPI.Procedimiento().then((res)=>{ 
      setProcedimiento(res.data.result);
    }) 
    dataAPI.Requisito().then((res)=>{ 
      var hash = res.data.result.reduce((p, c) => (p[c.procedimiento] ? p[c.procedimiento].push(c) : (p[c.procedimiento] = [c]), p), {}),
      newhash = Object.keys(hash).map((k) => ({
        procedimiento: k,
        procedimientos: hash[k],
      }));
      console.log(newhash)
      setRequisito(newhash);
    }) 

    console.log("de esta forma solo se ejecuta una vez");
    return () => {
      //cleanup
    }
  },[])

//#endregion


if(typeof(selectedFiles) !== 'undefined'){
  console.log("----------------------------------------------------------------")
  console.log(selectedFiles); 
  //console.log(selectedFiles.find( item => item.indice == 0)); 
  console.log("----------------------------------------------------------------")
}


  //Expediente
//#region Expediente

  const handleTipoSelected = (item) => {
    setExpediente(prevState => ({
        ...prevState,
        procedimiento: item.procedimiento
    }));
    setProcedimientoSeleccionado(item);
    handleNext();
  };

  const guardarTipoDocumento= (item) => {
    setExpediente(prevState => ({
        ...prevState,
        tipodocumento: item
    }));
  };
  const guardardocumentoInteresado= (item) => {
    setExpediente(prevState => ({
        ...prevState,
        documentointeresado: item
    }));
    Buscarpersona(item)
  };

  const guardarTipoDocumentoCompleto= (item) => {
    setTipoDocumentoCompleto(item);
  };

  const guardarresponsablelegal= (item) => {
    setExpediente(prevState => ({
        ...prevState,
        responsablelegal: item
    }));
  };

  const Buscarpersona= (item) => {
    dataAPI.Persona(item).then((res)=>{ 
      if(res.data.result.length != 0){
        setDatosInteresado(prevState => ({
            ...prevState,
            nombre: res.data.result[0].nombre,
            telefono:  res.data.result[0].telefono,
            email: res.data.result[0].email
        }));
        guardarresponsablelegal(res.data.result[0].nombre)
      }
    }) 
  };


  const guardarTelefono= (item) => {
    setDatosInteresado(prevState => ({
        ...prevState,
        telefono:  item
    }));
  };

  const guardarEmail= (item) => {
    setDatosInteresado(prevState => ({
        ...prevState,
        email:  item
    }));
  };

  //#endregion


  const onSelectedFilesChanged = (e, index) => {


    //console.log("******************************************************************")
    var archivos = { indice:index, archivo : e }
    let newArr = [...selectedFiles]; // copying the old datas array
    let indicegeneral = selectedFiles.findIndex( item => item.indice == index)
    newArr[indicegeneral] = archivos; 
    if(indicegeneral!=-1){
      setselectedFiles(newArr);
    }
    else{
      setselectedFiles(prevArray => [...prevArray, archivos])
    }
    //console.log("******************************************************************")

    /*var archivos = { indice:index, archivo : e }
    setselectedFiles(prevArray => [...prevArray, archivos])*/

  }

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
                      <TableCell aling="center">
                        {item.codigo}
                      </TableCell>
                      <TableCell aling="center">{item.denominacion}</TableCell>

                      <TableCell aling="center">

                      <List dense>
                          {Requisito.find(
                            (req) => req.procedimiento == item.procedimiento
                          ) &&
                          Requisito.find((req) => req.procedimiento == item.procedimiento)
                              .procedimientos.map((req) => (
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
                if(newValue != null){
                  guardarTipoDocumento(newValue.tipodocumentoidentidad);
                  guardarTipoDocumentoCompleto(newValue.descripcion)
                }
              }}
              options={TipoDocumentos}
              getOptionLabel={(option) => option.descripcion }
              value ={{descripcion: TipoDocumentoCompleto ?? ""}}
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
              value={DatosInteresado.nombre ?? ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="Telefono"
              label="Telefono"
              variant="outlined"
              type="number"
              fullWidth
              value={DatosInteresado.telefono ?? ""}
              onBlur={(event) => {guardarTelefono(event.target.value);}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
            id="Email" label="Email" type="email" variant="outlined" 
            fullWidth 
            value={DatosInteresado.email ?? ""}
            onBlur={(event) => {guardarEmail(event.target.value);}}
            />
          </Grid>
        </>
      );
    case 2:
      return (
      <>
        {/* <form id="file" method="post" action="" encType="multipart/form-data"> */}
          <List dense>
            {Requisito.find(
              (req) => req.procedimiento == ProcedimientoSeleccionado.procedimiento
            ) && 
            Requisito.find((req) => req.procedimiento == ProcedimientoSeleccionado.procedimiento)
              .procedimientos.map((req, index) => (

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
                        <Grid 
                        container 
                        justify="center"
                        alignItems="center">
                          <Grid item xs={12} sm={6}>
                            {req.tbRequisito_descripcion} {index}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                              <div className="dx-fieldset">
                              </div>
                              <div className="fileuploader-container">
                                <FileUploader selectButtonText="Seleccionar Archivo" 
                                onValueChanged={(event, value) => {
                                      onSelectedFilesChanged(event,index);
                                }}
                                value = {typeof(selectedFiles.find( item => item.indice == index)) !== 'undefined' ?  selectedFiles.find( item => item.indice == index).archivo.value :[]}
                                labelText="" accept="image/*" uploadMode="useForm" />
                              </div>
                          </Grid>
                        </Grid>
                      </Typography>
                    }
                  />
                </ListItem>
              )
            )}

          </List>
          {/* </form> */}
       </>
      );
    case 3:
      return "Verificar";
    default:
      return "Desconocido";
  }
};

export default GetStepContent;
