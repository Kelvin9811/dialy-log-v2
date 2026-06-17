/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateViaje = /* GraphQL */ `
  subscription OnCreateViaje(
    $filter: ModelSubscriptionViajeFilterInput
    $owner: String
  ) {
    onCreateViaje(filter: $filter, owner: $owner) {
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
      owner
      __typename
    }
  }
`;
export const onUpdateViaje = /* GraphQL */ `
  subscription OnUpdateViaje(
    $filter: ModelSubscriptionViajeFilterInput
    $owner: String
  ) {
    onUpdateViaje(filter: $filter, owner: $owner) {
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
      owner
      __typename
    }
  }
`;
export const onDeleteViaje = /* GraphQL */ `
  subscription OnDeleteViaje(
    $filter: ModelSubscriptionViajeFilterInput
    $owner: String
  ) {
    onDeleteViaje(filter: $filter, owner: $owner) {
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
      owner
      __typename
    }
  }
`;
export const onCreateCatalogoItem = /* GraphQL */ `
  subscription OnCreateCatalogoItem(
    $filter: ModelSubscriptionCatalogoItemFilterInput
    $owner: String
  ) {
    onCreateCatalogoItem(filter: $filter, owner: $owner) {
      id
      tipo
      nombre
      activo
      descripcion
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateCatalogoItem = /* GraphQL */ `
  subscription OnUpdateCatalogoItem(
    $filter: ModelSubscriptionCatalogoItemFilterInput
    $owner: String
  ) {
    onUpdateCatalogoItem(filter: $filter, owner: $owner) {
      id
      tipo
      nombre
      activo
      descripcion
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteCatalogoItem = /* GraphQL */ `
  subscription OnDeleteCatalogoItem(
    $filter: ModelSubscriptionCatalogoItemFilterInput
    $owner: String
  ) {
    onDeleteCatalogoItem(filter: $filter, owner: $owner) {
      id
      tipo
      nombre
      activo
      descripcion
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
