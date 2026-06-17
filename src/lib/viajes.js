import amplifyApiClient from "./amplifyApi.js";
import { listViajes } from "../graphql/queries.js";

const mapViajeFromApi = (viaje) => ({
  id: viaje.id,
  fecha: viaje.fecha ?? "",
  dia: viaje.dia ?? "",
  clienteEmpresa: viaje.clienteEmpresa ?? "",
  rutaDestino: viaje.rutaDestino ?? "",
  subrutaPuntoLocal: viaje.subrutaPuntoLocal ?? "",
  responsableAsignado: viaje.responsableAsignado ?? "",
  estado: viaje.estado ?? "",
  observaciones: viaje.observaciones ?? "",
  valorMonto:
    viaje.valorMonto === null || viaje.valorMonto === undefined ? "" : String(viaje.valorMonto),
  numeroPedidos:
    viaje.numeroPedidos === null || viaje.numeroPedidos === undefined
      ? ""
      : String(viaje.numeroPedidos),
  placaVehiculo: viaje.placaVehiculo ?? "",
  createdAt: viaje.createdAt ?? "",
  updatedAt: viaje.updatedAt ?? "",
  owner: viaje.owner ?? "",
});

const sortViajesByFechaDesc = (viajes) =>
  [...viajes].sort((left, right) => {
    const leftDate = left.fecha ?? "";
    const rightDate = right.fecha ?? "";

    return rightDate.localeCompare(leftDate);
  });

export async function fetchViajes() {
  const response = await amplifyApiClient.graphql({
    query: listViajes,
    variables: {
      limit: 500,
    },
  });

  const items = response.data?.listViajes?.items ?? [];

  return sortViajesByFechaDesc(items.filter(Boolean).map(mapViajeFromApi));
}

export { mapViajeFromApi };
