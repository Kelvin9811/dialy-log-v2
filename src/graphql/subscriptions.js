/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateViaje = /* GraphQL */ `
  subscription OnCreateViaje($filter: ModelSubscriptionViajeFilterInput) {
    onCreateViaje(filter: $filter) {
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
      adelanto
      numeroPedidos
      placaVehiculo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateViaje = /* GraphQL */ `
  subscription OnUpdateViaje($filter: ModelSubscriptionViajeFilterInput) {
    onUpdateViaje(filter: $filter) {
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
      adelanto
      numeroPedidos
      placaVehiculo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteViaje = /* GraphQL */ `
  subscription OnDeleteViaje($filter: ModelSubscriptionViajeFilterInput) {
    onDeleteViaje(filter: $filter) {
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
      adelanto
      numeroPedidos
      placaVehiculo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCatalogoItem = /* GraphQL */ `
  subscription OnCreateCatalogoItem(
    $filter: ModelSubscriptionCatalogoItemFilterInput
  ) {
    onCreateCatalogoItem(filter: $filter) {
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
export const onUpdateCatalogoItem = /* GraphQL */ `
  subscription OnUpdateCatalogoItem(
    $filter: ModelSubscriptionCatalogoItemFilterInput
  ) {
    onUpdateCatalogoItem(filter: $filter) {
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
export const onDeleteCatalogoItem = /* GraphQL */ `
  subscription OnDeleteCatalogoItem(
    $filter: ModelSubscriptionCatalogoItemFilterInput
  ) {
    onDeleteCatalogoItem(filter: $filter) {
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
