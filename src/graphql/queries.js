/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getViaje = /* GraphQL */ `
  query GetViaje($id: ID!) {
    getViaje(id: $id) {
      id
      fecha
      dia
      clienteEmpresa
      rutaDestino
      subrutaPuntoLocal
      responsableAsignado
      estado
      observaciones
      valorMonto
      numeroPedidos
      placaVehiculo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listViajes = /* GraphQL */ `
  query ListViajes(
    $filter: ModelViajeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listViajes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fecha
        dia
        clienteEmpresa
        rutaDestino
        subrutaPuntoLocal
        responsableAsignado
        estado
        observaciones
        valorMonto
        numeroPedidos
        placaVehiculo
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCatalogoItem = /* GraphQL */ `
  query GetCatalogoItem($id: ID!) {
    getCatalogoItem(id: $id) {
      id
      tipo
      nombre
      activo
      descripcion
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCatalogoItems = /* GraphQL */ `
  query ListCatalogoItems(
    $filter: ModelCatalogoItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCatalogoItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tipo
        nombre
        activo
        descripcion
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const viajesPorFecha = /* GraphQL */ `
  query ViajesPorFecha(
    $fecha: AWSDate!
    $estado: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelViajeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    viajesPorFecha(
      fecha: $fecha
      estado: $estado
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        fecha
        dia
        clienteEmpresa
        rutaDestino
        subrutaPuntoLocal
        responsableAsignado
        estado
        observaciones
        valorMonto
        numeroPedidos
        placaVehiculo
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const viajesPorEstado = /* GraphQL */ `
  query ViajesPorEstado(
    $estado: String!
    $fecha: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelViajeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    viajesPorEstado(
      estado: $estado
      fecha: $fecha
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        fecha
        dia
        clienteEmpresa
        rutaDestino
        subrutaPuntoLocal
        responsableAsignado
        estado
        observaciones
        valorMonto
        numeroPedidos
        placaVehiculo
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const catalogosPorTipo = /* GraphQL */ `
  query CatalogosPorTipo(
    $tipo: CatalogoTipo!
    $nombre: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCatalogoItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    catalogosPorTipo(
      tipo: $tipo
      nombre: $nombre
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tipo
        nombre
        activo
        descripcion
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
