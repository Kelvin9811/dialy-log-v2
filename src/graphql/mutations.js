/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createViaje = /* GraphQL */ `
  mutation CreateViaje(
    $input: CreateViajeInput!
    $condition: ModelViajeConditionInput
  ) {
    createViaje(input: $input, condition: $condition) {
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
      pesoKg
      numeroGuia
      placaVehiculo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateViaje = /* GraphQL */ `
  mutation UpdateViaje(
    $input: UpdateViajeInput!
    $condition: ModelViajeConditionInput
  ) {
    updateViaje(input: $input, condition: $condition) {
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
      pesoKg
      numeroGuia
      placaVehiculo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteViaje = /* GraphQL */ `
  mutation DeleteViaje(
    $input: DeleteViajeInput!
    $condition: ModelViajeConditionInput
  ) {
    deleteViaje(input: $input, condition: $condition) {
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
      pesoKg
      numeroGuia
      placaVehiculo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCatalogoItem = /* GraphQL */ `
  mutation CreateCatalogoItem(
    $input: CreateCatalogoItemInput!
    $condition: ModelCatalogoItemConditionInput
  ) {
    createCatalogoItem(input: $input, condition: $condition) {
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
export const updateCatalogoItem = /* GraphQL */ `
  mutation UpdateCatalogoItem(
    $input: UpdateCatalogoItemInput!
    $condition: ModelCatalogoItemConditionInput
  ) {
    updateCatalogoItem(input: $input, condition: $condition) {
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
export const deleteCatalogoItem = /* GraphQL */ `
  mutation DeleteCatalogoItem(
    $input: DeleteCatalogoItemInput!
    $condition: ModelCatalogoItemConditionInput
  ) {
    deleteCatalogoItem(input: $input, condition: $condition) {
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
