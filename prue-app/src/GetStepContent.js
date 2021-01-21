import React, { useState } from "react";
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

import { tipoDocumento, requisitoTipoTramite, tipoTramite } from "./data";

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

const GetStepContent = ({ step, handleNext }) => {
  const classes = useStyles();

  const [TipoSelected, setTipoSelected] = useState({});

  const handleTipoSelected = (item) => {
    setTipoSelected(item);
    handleNext();
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
                  {tipoTramite.map((item) => (
                    <TableRow
                      key={item._id}
                      hover
                      onClick={() => handleTipoSelected(item)}
                    >
                      <TableCell aling="center">
                        {item._id.substring(18)}
                      </TableCell>
                      <TableCell aling="center">{item.concepto}</TableCell>
                      <TableCell aling="center">
                        <List dense>
                          {requisitoTipoTramite.find(
                            (req) => req._idtipoTramite === item._id
                          ) &&
                            requisitoTipoTramite
                              .find((req) => req._idtipoTramite === item._id)
                              .requisitos.map((req) => (
                                <ListItem key={req._id}>
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
                                        {req.Nombre}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              ))}
                        </List>
                      </TableCell>
                      <TableCell aling="center">
                        {item.tiempoEstimado}
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
              options={tipoDocumento}
              getOptionLabel={(option) => option.tipo}
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
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Nombre"
              label="Nombre"
              variant="outlined"
              fullWidth
              defaultValue="Nombre Completo"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="Telefono"
              label="Telefono"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="Email" label="Email" variant="outlined" fullWidth />
          </Grid>
        </>
      );
    case 2:
      return "Adjuntar Requisitos";
    case 3:
      return "Verificar";
    default:
      return "Desconocido";
  }
};

export default GetStepContent;
