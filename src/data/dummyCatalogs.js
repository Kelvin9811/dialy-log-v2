export const dummyCatalogs = {
  clientes: [
    { id: 1, name: "Cliente A" },
    { id: 2, name: "Cliente B" },
    { id: 3, name: "Empresa Central" },
  ],
  rutas: [
    { id: 1, name: "Ruta Norte" },
    { id: 2, name: "Ruta Centro" },
    { id: 3, name: "Destino Sur" },
  ],
  subrutas: [
    { id: 1, name: "Sucursal Quito" },
    { id: 2, name: "Punto Mall" },
    { id: 3, name: "Centro logistico" },
  ],
  responsables: [
    { id: 1, name: "Carlos Mena" },
    { id: 2, name: "Luis Perez" },
    { id: 3, name: "Ana Torres" },
  ],
  estados: [
    { id: 1, name: "Entregado" },
    { id: 2, name: "Pendiente" },
    { id: 3, name: "Contratado" },
    { id: 4, name: "En ruta" },
    { id: 5, name: "Cancelado" },
  ],
  vehiculos: [
    { id: 1, name: "ABC-1234" },
    { id: 2, name: "PDE-4567" },
    { id: 3, name: "TZX-9080" },
  ],
};

export const catalogDefinitions = [
  {
    key: "clientes",
    label: "Clientes / empresas",
    description: "Empresas o clientes disponibles para registrar operaciones.",
  },
  {
    key: "rutas",
    label: "Rutas o destinos",
    description: "Destinos principales que se usan en los registros diarios.",
  },
  {
    key: "subrutas",
    label: "Subrutas / puntos / locales",
    description: "Puntos intermedios, locales o lugares especificos por ruta.",
  },
  {
    key: "responsables",
    label: "Responsables / conductores",
    description: "Personas asignadas o conductores disponibles en el sistema.",
  },
  {
    key: "estados",
    label: "Estados",
    description: "Estados operativos visibles en formularios y reportes.",
  },
  {
    key: "vehiculos",
    label: "Vehiculos / placas",
    description: "Placas o vehiculos disponibles para asignacion.",
  },
];
