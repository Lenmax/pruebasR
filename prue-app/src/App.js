import React from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  makeStyles,
  Container,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  withStyles,
  StepConnector,
  StepContent,
  Button,
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
  Chip,
  TextField,
} from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import AttachmentIcon from "@material-ui/icons/Attachment";

import Autocomplete from "@material-ui/lab/Autocomplete";
import GetStepContent from "./GetStepContent";

import * as dataAPI from './data';


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  principalContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 6),
  },
  contentStep: {
    marginTop: "2em",
  },
  mb1: {
    marginBottom: "1em",
  },
}));

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <ListAltIcon />,
    2: <AssignmentIndIcon />,
    3: <AttachFileIcon />,
    4: <AssignmentTurnedInIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps() {
  return [
    "Seleccionar Tramite",
    "Datos del Interesado",
    "Adjuntar Requisitos",
    "Verificar",
  ];
}

const getStepContent = (step, handleNext) => {
  switch (step) {
    case 0:
      return (
        <>
          <Grid item xs={12} style={{ marginBottom: "1em" }}>
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
                  <TableRow hover onClick={handleNext}>
                    <TableCell align="center">0125489</TableCell>
                    <TableCell>Certificado de Estudios</TableCell>
                    <TableCell>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <AttachmentIcon />
                          </ListItemIcon>
                          <ListItemText primary="Solicitud Dirigida al Rector" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <AttachmentIcon />
                          </ListItemIcon>
                          <ListItemText primary="Certificados de estudios secundarios conscluidos en original" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <AttachmentIcon />
                          </ListItemIcon>
                          <ListItemText primary="Certificado de acreditacion expendio..." />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <AttachmentIcon />
                          </ListItemIcon>
                          <ListItemText primary="Certificado electronco de no tener atecendentes penales" />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell align="center">80 minutos</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      );
    case 1:
      return (
        <>
          <Grid item md={6}>
            <Autocomplete
              id="TipoDocumento"
              options={tipoDocumentos}
              getOptionLabel={(option) => option.tipodocumentoidentidad}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo Documento"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={6}>
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
          <Grid item md={6}>
            <TextField
              id="Telefono"
              label="Telefono"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
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


let tipoDocumentos = [];
const App = () => {
  const classes = useStyles();

  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Sistema de Tramite Administrativo
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.principalContent}>
          <Container spacing={2} justify="center">
            <Grid>
              <Card>
                <CardContent className={classes.root}>
                  <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<ColorlibConnector />}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                          {label}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <>
                    {activeStep === steps.length ? (
                      <div>
                        <Typography className={classes.instructions}>
                          All steps completed - you&apos;re finished
                        </Typography>
                        <Button
                          onClick={handleReset}
                          className={classes.button}
                        >
                          Reset
                        </Button>
                      </div>
                    ) : (
                      <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="center"
                        className={classes.contentStep}
                        //alignItems="center"
                      >
                        <Grid container spacing={3} item xs={12}>
                          {/* {getStepContent(activeStep, handleNext) */}
                          <GetStepContent
                            step={activeStep}
                            handleNext={handleNext}
                          />
                        </Grid>
                        <Grid container item xs={12} justify="center">
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Paso Anterior
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1
                              ? "Finalizar"
                              : "Siguiente"}
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </>
                </CardContent>
              </Card>
            </Grid>
          </Container>
        </div>
      </main>
    </>
  );
};

export default App;
