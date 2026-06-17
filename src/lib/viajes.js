import amplifyApiClient from "./amplifyApi.js";
import { listViajes } from "../graphql/queries.js";
import { createViaje } from "../graphql/mutations.js";

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

const toNullableString = (value) => {
  const trimmedValue = value?.trim?.() ?? "";

  return trimmedValue ? trimmedValue : null;
};

const toNullableFloat = (value) => {
  const trimmedValue = value?.trim?.() ?? "";

  if (!trimmedValue) {
    return null;
  }

  const parsedValue = Number.parseFloat(trimmedValue);

  return Number.isNaN(parsedValue) ? null : parsedValue;
};

const toNullableInt = (value) => {
  const trimmedValue = value?.trim?.() ?? "";

  if (!trimmedValue) {
    return null;
  }

  const parsedValue = Number.parseInt(trimmedValue, 10);

  return Number.isNaN(parsedValue) ? null : parsedValue;
};

const mapViajeToCreateInput = (viaje) => ({
  fecha: viaje.fecha,
  dia: toNullableString(viaje.dia),
  clienteEmpresa: viaje.clienteEmpresa.trim(),
  rutaDestino: viaje.rutaDestino.trim(),
  subrutaPuntoLocal: toNullableString(viaje.subrutaPuntoLocal),
  responsableAsignado: toNullableString(viaje.responsableAsignado),
  estado: viaje.estado.trim(),
  observaciones: toNullableString(viaje.observaciones),
  valorMonto: toNullableFloat(viaje.valorMonto),
  numeroPedidos: toNullableInt(viaje.numeroPedidos),
  placaVehiculo: toNullableString(viaje.placaVehiculo),
});

export async function createViajeRecord(viaje) {
  const response = await amplifyApiClient.graphql({
    query: createViaje,
    variables: {
      input: mapViajeToCreateInput(viaje),
    },
  });

  const createdViaje = response.data?.createViaje;

  if (!createdViaje) {
    throw new Error("No se recibio la respuesta esperada al crear el viaje.");
  }

  return mapViajeFromApi(createdViaje);
}

export { mapViajeFromApi };
