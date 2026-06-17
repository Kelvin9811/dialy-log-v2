import amplifyApiClient from "./amplifyApi.js";
import { catalogosPorTipo } from "../graphql/queries.js";

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
