const axios = require("axios");

const urltramite = "http://10.10.42.204:4020/api/";
const urlgeneral = "http://10.10.42.204:4010/api/";

export const Links = [
  {
    id: 0,
    text: "Nuevo",
    path: "/Nuevo",
    icon: "plus",
    content: "User tab content",
  },
  {
    id: 1,
    text: "Tramites",
    path: "/Tramites",
    icon: "folder",
    content: "Comment tab content",
  },
  {
    id: 2,
    text: "Buscar",
    path: "/Buscar",
    icon: "search",
    content: "Find tab content",
  },
  {
    id: 3,
    text: "Reportes",
    path: "/Reportes",
    icon: "chart",
    content: "asdas",
  },
];

export const employee = {
  ID: 1,
  FirstName: "John",
  LastName: "Heart",
  Position: "CEO",
  BirthDate: "1964/03/16",
  HireDate: "1995/01/15",
  Notes:
    "John has been in the Audio/Video industry since 1990. He has led DevAV as its CEO since 2003.\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
  Address: "351 S Hill St.",
  City: "Los Angeles",
  State: "CA",
  ZipCode: "90013",
  Home: "555-684-1334",
  Mobile: "555-684-1335",
  Email: "jheart@dx-email.com",
  Skype: "jheart_DX_skype",
};

export const positions = [
  "HR Manager",
  "IT Manager",
  "CEO",
  "Controller",
  "Sales Manager",
  "Support Manager",
  "Shipping Manager",
];

export const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export const tipoDocumento = () => {
  return axios
    .post(urlgeneral + "TipoDocumentoIdentidad", {
      jsonrpc: "2.0",
      method: "TipoDocumentoIdentidadlistarpor",
      params: {},
      id: 1,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      var errores = {};
      errores.mensaje = error;
      errores.estado = 1;
      return errores;
    });
};
/*export const tipoDocumento = [
  {
    _id: "5fd36f3a5b79009813640430",
    descripcion: "LIBRETA ELECTORAL O DNI",
    tipo: "L.E / DNI",
  },
  {
    _id: "5fd36fd65b79009813640435",
    descripcion: "CARNET DE EXTRANJERIA",
    tipo: "CARNET EXT.",
  },
  {
    _id: "5fd370365b79009813640436",
    descripcion: "REG. UNICO DE CONTRIBUYENTES",
    tipo: "RUC",
  },
  {
    _id: "5fd3704b5b79009813640437",
    descripcion: "PASAPORTE",
    tipo: "PASAPORTE",
  },
  {
    _id: "5fd3704b5b79009813640438",
    descripcion: "CARNET DE ESTUDIANTE",
    tipo: "CODIGO DE ESTUDIANTE",
  },
];*/

export const Procedimiento = () => {
  return axios
    .post(urltramite + "Procedimiento", {
      jsonrpc: "2.0",
      method: "Procedimientolistarpor",
      params: {
        procedimiento: null,
        denominacion: null,
        tiempoestimado: null,
        observacion: null,
        codigo: null,
        categoria: null,
        baselegal: null,
        estado: null,
      },
      id: 2,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      var errores = {};
      errores.mensaje = error;
      errores.estado = 1;
      return errores;
    });
};
/*export const tipoTramite = [
  {
    _id: "5fc7a24aae0fcc13b0a8aafb",
    concepto:
      "Este tramite permite la devolución de dinero al estudiante que lo requirió.",
    costo: "15.00",
    tiempoEstimado: "24h",
  },
  {
    _id: "5fc7a1f8ec87c95e02c47faf",
    concepto: "Matrícula de Ingresante.",
    costo: "300.00",
    tiempoEstimado: "24h",
  },
  {
    _id: "5fc7acc8bee4edcdf20bc86e",
    concepto: "Solicitud de ficha de seguimiento.",
    costo: "10.00",
    tiempoEstimado: "24h",
  },
];*/

export const rutaTipoTramite = [
  {
    _idtipoTramite: "5fc7a24aae0fcc13b0a8aafb",
    ruta: [
      {
        _id: "1",
        DepenciaOrigen: "DepA",
        DepenciaDependecia: "DepB",
        Order: 1,
        Duracion: "45",
      },
      {
        _id: "2",
        DepenciaOrigen: "DepB",
        DepenciaDependecia: "DepC",
        Order: 2,
        Duracion: "4",
      },
    ],
  },
  {
    _idtipoTramite: "5fc7a1f8ec87c95e02c47faf",
    ruta: [
      {
        _id: "1",
        DepenciaOrigen: "DepA",
        DepenciaDependecia: "DepB",
        Order: 1,
        Duracion: "45",
      },
      {
        _id: "2",
        DepenciaOrigen: "DepB",
        DepenciaDependecia: "DepC",
        Order: 2,
        Duracion: "4",
      },
    ],
  },
];

export const Requisito = () => {
  return axios
    .post(urltramite + "ProcedimientoRequisito", {
      jsonrpc: "2.0",
      method: "ProcedimientoRequisitolistarpor",
      params: {
        procedimientorequisito: null,
        requisito: null,
        procedimiento: null,
        descripcion: null,
        urlformato: null,
        estado: null,
      },
      id: 2,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      var errores = {};
      errores.mensaje = error;
      errores.estado = 1;
      return errores;
    });
};
/*export const requisitoTipoTramite = [
  {
    _idtipoTramite: "5fc7a24aae0fcc13b0a8aafb",
    requisitos: [
      {
        _id: "1",
        Nombre: "Solicitud Dirigida al Rector",
      },
      {
        _id: "2",
        Nombre: "Certificados de estudios secundarios conscluidos en original",
      },
      {
        _id: "3",
        Nombre: "Certificado de acreditacion expendio...",
      },
      {
        _id: "4",
        Nombre: "Certificado electronco de no tener atecendentes penales",
      },
    ],
  },
  {
    _idtipoTramite: "5fc7a1f8ec87c95e02c47faf",
    requisitos: [
      {
        _id: "1",
        Nombre: "Solicitud Dirigida al Rector 2",
      },
      {
        _id: "2",
        Nombre:
          "Certificados de estudios secundarios conscluidos en original 2",
      },
      {
        _id: "3",
        Nombre: "Certificado de acreditacion expendio... 2",
      },
      {
        _id: "4",
        Nombre: "Certificado electronco de no tener atecendentes penales 2",
      },
    ],
  },
];*/

export const Persona = (dni) => {
  return axios
    .post(urlgeneral + "Persona", {
      jsonrpc: "2.0",
      method: "PersonaRecuperar",
      params: {
        dni: dni,
      },
      id: 2,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      var errores = {};
      errores.mensaje = error;
      errores.estado = 1;
      return errores;
    });
};

export const tramite = {
  _id: "0",
  //Externos / Internos
  idTramite: "E0001",
  //DatosPersonales
  documentoInteresado: "85968574",
  idtipoDocumento: "5fd36f3a5b79009813640430",
  responsableLegal: "",
  telefonos: ["123", "132"],
  correos: ["hola@gmail.com", "hola2@gmail.com"],
  //Tramite
  idTipoTramite: "5fc7a24aae0fcc13b0a8aafb",
  fechaIncio: Date.now(),
  fechaFin: "",
  estado: 1,
  detalle: "",
  observacion: "",
};

export const guardarNuevoExpediente = (Expediente) => {
  console.log(Expediente);
  return axios
    .post(urltramite + "Expediente", {
      jsonrpc: "2.0",
      method: "ExpedienteGuardarExterno",
      params: {
        procedimiento: Expediente.procedimiento,
        expediente: Expediente.expediente,
        documentointeresado: Expediente.documentointeresado,
        responsablelegal: Expediente.responsablelegal,
        descripcion: Expediente.descripcion,
        detalle_expediente: Expediente.detalle_expediente,
        periodo: Expediente.periodo.toString(),
        observacion_expediente: Expediente.observacion_expediente,
        estadoexpediente: Expediente.estadoexpediente,
        tipoprioridad: Expediente.tipoprioridad,
        tipodocumento: Expediente.tipodocumento,
        dependenciaorigen: Expediente.dependenciaorigen,
        dependenciadestino: Expediente.dependenciadestino,
        usuarioatiende: Expediente.usuarioatiende,
        detalle_historialexpediente: Expediente.detalle_historialexpediente,
        observacion_historialexpediente:
          Expediente.observacion_historialexpediente,
        tipoestadohistorialexpediente: Expediente.tipoestadohistorialexpediente,
        arreglo_historialarchivo: Expediente.arreglo_historialarchivo,
        usuarioCreacion: Expediente.usuarioCreacion,
      },
      id: 2,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      var errores = {};
      errores.mensaje = error;
      errores.estado = 1;
      return errores;
    });
};

export const guardarNuevoPersona = (Persona) => {
  return axios
    .post(urlgeneral + "Persona", {
      jsonrpc: "2.0",
      method: "PersonaGuardar",
      params: {
        dni: Persona.dni,
        ubigeo: Persona.ubigeo,
        nombre: Persona.nombre,
        tipodocumentoidentidad: Persona.tipodocumentoidentidad,
        direccion: Persona.direccion,
        telefono: Persona.telefono,
        email: Persona.email,
        genero: Persona.genero ?? "",
        estadocivil: Persona.estadocivil,
        fechanacimiento: Persona.fechanacimiento,
        ubigeonacimiento: Persona.ubigeonacimiento ?? "",
        fechadefuncion: Persona.fechadefuncion ?? null,
        usuario: Persona.usuario,
        estado: Persona.estado,
      },
      id: 1,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      var errores = {};
      errores.mensaje = error;
      errores.estado = 1;
      return errores;
    });
};

export const DependenciaInformacion = (rof, dependencia) => {
  return axios
    .post(urlgeneral + "Dependencia", {
      jsonrpc: "2.0",
      method: "DependenciaInformacion",
      params: {
        rof: rof,
        dependencia: dependencia,
      },
      id: 1,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      var errores = {};
      errores.mensaje = error;
      errores.estado = 1;
      return errores;
    });
};
