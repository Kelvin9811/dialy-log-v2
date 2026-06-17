import amplifyApiClient from "./amplifyApi.js";
import { catalogosPorTipo } from "../graphql/queries.js";
import {
  createCatalogoItem,
  deleteCatalogoItem,
  updateCatalogoItem,
} from "../graphql/mutations.js";

export const catalogKeyToTipo = {
  clientes: "CLIENTE",
  rutas: "RUTA",
  subrutas: "SUBRUTA",
  responsables: "RESPONSABLE",
  estados: "ESTADO",
  vehiculos: "VEHICULO",
};

export const tipoToCatalogKey = Object.fromEntries(
  Object.entries(catalogKeyToTipo).map(([key, value]) => [value, key])
);

export const emptyCatalogs = Object.fromEntries(
  Object.keys(catalogKeyToTipo).map((key) => [key, []])
);

export const mapCatalogoItemFromApi = (item) => ({
  id: item.id,
  name: item.nombre ?? "",
  activo: item.activo ?? true,
  descripcion: item.descripcion ?? "",
  tipo: item.tipo ?? "",
  createdAt: item.createdAt ?? "",
  updatedAt: item.updatedAt ?? "",
  owner: item.owner ?? "",
});

export async function fetchCatalogItemsByTipo(tipo) {
  const response = await amplifyApiClient.graphql({
    query: catalogosPorTipo,
    variables: {
      tipo,
      limit: 500,
    },
  });

  const items = response.data?.catalogosPorTipo?.items ?? [];

  return items.filter(Boolean).map(mapCatalogoItemFromApi);
}

export async function fetchAllCatalogs() {
  const entries = await Promise.all(
    Object.entries(catalogKeyToTipo).map(async ([catalogKey, tipo]) => {
      const items = await fetchCatalogItemsByTipo(tipo);

      return [
        catalogKey,
        items
          .filter((item) => item.activo !== false)
          .sort((left, right) => left.name.localeCompare(right.name)),
      ];
    })
  );

  return Object.fromEntries(entries);
}

export async function createCatalogItemRecord(catalogKey, itemName) {
  const tipo = catalogKeyToTipo[catalogKey];

  const response = await amplifyApiClient.graphql({
    query: createCatalogoItem,
    variables: {
      input: {
        tipo,
        nombre: itemName.trim(),
        activo: true,
      },
    },
  });

  const createdItem = response.data?.createCatalogoItem;

  if (!createdItem) {
    throw new Error("No se recibio la respuesta esperada al crear el catalogo.");
  }

  return mapCatalogoItemFromApi(createdItem);
}

export async function updateCatalogItemRecord(itemId, itemName) {
  const response = await amplifyApiClient.graphql({
    query: updateCatalogoItem,
    variables: {
      input: {
        id: itemId,
        nombre: itemName.trim(),
      },
    },
  });

  const updatedItem = response.data?.updateCatalogoItem;

  if (!updatedItem) {
    throw new Error("No se recibio la respuesta esperada al actualizar el catalogo.");
  }

  return mapCatalogoItemFromApi(updatedItem);
}

export async function deleteCatalogItemRecord(itemId) {
  const response = await amplifyApiClient.graphql({
    query: deleteCatalogoItem,
    variables: {
      input: {
        id: itemId,
      },
    },
  });

  const deletedItem = response.data?.deleteCatalogoItem;

  if (!deletedItem) {
    throw new Error("No se recibio la respuesta esperada al eliminar el catalogo.");
  }

  return deletedItem.id;
}
