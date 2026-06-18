import { useMemo, useState } from "react";
import { catalogDefinitions } from "../../data/catalogDefinitions.js";

const dayNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDayFromDate = (value) => {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return dayNames[parsedDate.getDay()];
};

const resolveFieldValue = (selectedValue, customValue) => {
  if (selectedValue === "__new__") {
    return customValue.trim();
  }

  return selectedValue;
};

const getInitialFormValues = () => ({
  fecha: getToday(),
  clienteEmpresa: "",
  clienteEmpresaNuevo: "",
  rutaDestino: "",
  rutaDestinoNueva: "",
  subrutaPuntoLocal: "",
  subrutaPuntoLocalNueva: "",
  responsableAsignado: "",
  responsableAsignadoNuevo: "",
  estado: "",
  estadoNuevo: "",
  observaciones: "",
  valorMonto: "",
  adelanto: "",
  numeroPedidos: "",
  placaVehiculo: "",
  placaVehiculoNueva: "",
});

const mapRecordToEditValues = (record) => ({
  id: record.id,
  fecha: record.fecha ?? getToday(),
  clienteEmpresa: record.clienteEmpresa ?? "",
  rutaDestino: record.rutaDestino ?? "",
  subrutaPuntoLocal: record.subrutaPuntoLocal ?? "",
  responsableAsignado: record.responsableAsignado ?? "",
  estado: record.estado ?? "",
  observaciones: record.observaciones ?? "",
  valorMonto: record.valorMonto ?? "",
  adelanto: record.adelanto ?? "",
  numeroPedidos: record.numeroPedidos ?? "",
  placaVehiculo: record.placaVehiculo ?? "",
});

function SelectOrInputField({
  inputName,
  label,
  options,
  selectName,
  selectValue,
  textValue,
  onChange,
}) {
  const isNewValue = selectValue === "__new__";

  return (
    <label className="form-field">
      <span>{label}</span>
      {isNewValue ? (
        <input
          name={inputName}
          type="text"
          placeholder={`Escribe ${label.toLowerCase()}`}
          value={textValue}
          onChange={onChange}
        />
      ) : (
        <select name={selectName} value={selectValue} onChange={onChange}>
          <option value="">Selecciona una opcion</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option === "__new__" ? "Agregar nuevo" : option}
            </option>
          ))}
        </select>
      )}
    </label>
  );
}

function EditRecordModal({
  clientOptions,
  editValues,
  isUpdatingRecord,
  onChange,
  onClose,
  responsibleOptions,
  routeOptions,
  statusOptions,
  subrouteOptions,
  onSubmit,
  updateRecordError,
  vehicleOptions,
}) {
  if (!editValues) {
    return null;
  }

  const currentDay = getDayFromDate(editValues.fecha);

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="edit-record-title">
        <div className="modal-header">
          <h3 id="edit-record-title">Editar registro</h3>
          <button className="icon-action close-action" type="button" onClick={onClose}>
            X
          </button>
        </div>

        <form className="registro-form" onSubmit={onSubmit}>
          {updateRecordError ? <p className="status-message error">{updateRecordError}</p> : null}

          <div className="registro-form-grid">
            <label className="form-field">
              <span>Fecha</span>
              <input name="fecha" type="date" value={editValues.fecha} onChange={onChange} />
            </label>

            <label className="form-field">
              <span>Dia</span>
              <input type="text" value={currentDay} readOnly />
            </label>

            <label className="form-field">
              <span>Cliente / empresa</span>
              <select name="clienteEmpresa" value={editValues.clienteEmpresa} onChange={onChange}>
                <option value="">Selecciona una opcion</option>
                {clientOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Ruta o destino</span>
              <select name="rutaDestino" value={editValues.rutaDestino} onChange={onChange}>
                <option value="">Selecciona una opcion</option>
                {routeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Subruta / punto / local</span>
              <select
                name="subrutaPuntoLocal"
                value={editValues.subrutaPuntoLocal}
                onChange={onChange}
              >
                <option value="">Selecciona una opcion</option>
                {subrouteOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Responsable / conductor / persona asignada</span>
              <select
                name="responsableAsignado"
                value={editValues.responsableAsignado}
                onChange={onChange}
              >
                <option value="">Selecciona una opcion</option>
                {responsibleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Estado</span>
              <select name="estado" value={editValues.estado} onChange={onChange}>
                <option value="">Selecciona una opcion</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Valor o monto</span>
              <input
                name="valorMonto"
                type="number"
                min="0"
                step="0.01"
                value={editValues.valorMonto}
                onChange={onChange}
              />
            </label>

            <label className="form-field">
              <span>Adelanto</span>
              <input
                name="adelanto"
                type="number"
                min="0"
                step="0.01"
                value={editValues.adelanto}
                onChange={onChange}
              />
            </label>

            <label className="form-field">
              <span>Numero de pedidos</span>
              <input
                name="numeroPedidos"
                type="number"
                min="0"
                step="1"
                value={editValues.numeroPedidos}
                onChange={onChange}
              />
            </label>

            <label className="form-field">
              <span>Placa del vehiculo</span>
              <select name="placaVehiculo" value={editValues.placaVehiculo} onChange={onChange}>
                <option value="">Selecciona una opcion</option>
                {vehicleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field form-field-wide">
              <span>Observaciones</span>
              <textarea
                name="observaciones"
                rows="4"
                value={editValues.observaciones}
                onChange={onChange}
              />
            </label>
          </div>

          <div className="form-actions">
            <button className="primary-action" type="submit" disabled={isUpdatingRecord}>
              {isUpdatingRecord ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ReportsPreview({
  clientOptions,
  deleteRecordError,
  isDeletingRecord,
  isLoadingRecords,
  isUpdatingRecord,
  onDeleteRecord,
  onUpdateRecord,
  records,
  recordsError,
  responsibleOptions,
  routeOptions,
  statusOptions,
  subrouteOptions,
  updateRecordError,
  vehicleOptions,
}) {
  const [filters, setFilters] = useState({
    fechaInicio: "",
    fechaFin: "",
    cliente: "",
    placa: "",
  });
  const [editingRecord, setEditingRecord] = useState(null);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesFechaInicio = !filters.fechaInicio || record.fecha >= filters.fechaInicio;
      const matchesFechaFin = !filters.fechaFin || record.fecha <= filters.fechaFin;
      const matchesCliente =
        !filters.cliente ||
        (record.clienteEmpresa ?? "")
          .toLowerCase()
          .includes(filters.cliente.trim().toLowerCase());
      const matchesPlaca =
        !filters.placa ||
        (record.placaVehiculo ?? "").toLowerCase().includes(filters.placa.trim().toLowerCase());

      return matchesFechaInicio && matchesFechaFin && matchesCliente && matchesPlaca;
    });
  }, [filters, records]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
      ...(name === "fechaInicio" &&
      current.fechaFin &&
      value &&
      value > current.fechaFin
        ? { fechaFin: value }
        : {}),
      ...(name === "fechaFin" &&
      current.fechaInicio &&
      value &&
      value < current.fechaInicio
        ? { fechaInicio: value }
        : {}),
    }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditingRecord((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      await onUpdateRecord?.({
        ...editingRecord,
        dia: getDayFromDate(editingRecord.fecha),
      });
      setEditingRecord(null);
    } catch (error) {
      // Error is rendered in the modal.
    }
  };

  const handleDelete = async (recordId) => {
    try {
      await onDeleteRecord?.(recordId);
    } catch (error) {
      // Error is rendered in the reports view.
    }
  };

  return (
    <div className="reports-preview">
      {isLoadingRecords ? <p className="status-message">Cargando viajes...</p> : null}
      {!isLoadingRecords && recordsError ? <p className="status-message error">{recordsError}</p> : null}
      {deleteRecordError ? <p className="status-message error">{deleteRecordError}</p> : null}

      <div className="reports-filters">
        <label className="form-field">
          <span>Fecha desde</span>
          <input
            name="fechaInicio"
            type="date"
            max={filters.fechaFin || undefined}
            value={filters.fechaInicio}
            onChange={handleFilterChange}
          />
        </label>

        <label className="form-field">
          <span>Fecha hasta</span>
          <input
            name="fechaFin"
            type="date"
            min={filters.fechaInicio || undefined}
            value={filters.fechaFin}
            onChange={handleFilterChange}
          />
        </label>

        <label className="form-field">
          <span>Filtrar por cliente</span>
          <input
            name="cliente"
            type="text"
            placeholder="Escribe un cliente"
            value={filters.cliente}
            onChange={handleFilterChange}
          />
        </label>

        <label className="form-field">
          <span>Filtrar por placa</span>
          <input
            name="placa"
            type="text"
            placeholder="Escribe una placa"
            value={filters.placa}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      <div className="reports-table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Dia</th>
              <th>Cliente</th>
              <th>Ruta</th>
              <th>Responsable</th>
              <th>Estado</th>
              <th>Pedidos</th>
              <th>Valor</th>
              <th>Adelanto</th>
              <th>Placa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.fecha || "-"}</td>
                <td>{record.dia || "-"}</td>
                <td>{record.clienteEmpresa || "-"}</td>
                <td>{record.rutaDestino || "-"}</td>
                <td>{record.responsableAsignado || "-"}</td>
                <td>{record.estado || "-"}</td>
                <td>{record.numeroPedidos || "-"}</td>
                <td>{record.valorMonto || "-"}</td>
                <td>{record.adelanto || "-"}</td>
                <td>{record.placaVehiculo || "-"}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="icon-action edit-action"
                      type="button"
                      onClick={() => setEditingRecord(mapRecordToEditValues(record))}
                    >
                      E
                    </button>
                    <button
                      className="icon-action delete-action"
                      type="button"
                      disabled={isDeletingRecord}
                      onClick={() => handleDelete(record.id)}
                    >
                      {isDeletingRecord ? "..." : "X"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="11" className="empty-report-cell">
                  {isLoadingRecords
                    ? "Cargando registros..."
                    : recordsError
                      ? "No fue posible cargar registros."
                      : "No hay registros que coincidan con los filtros."}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="reports-summary-grid">
        <div className="report-summary-card">
          <span>Total viajes filtrados</span>
          <strong>{filteredRecords.length}</strong>
        </div>
        <div className="report-summary-card">
          <span>Total a cobrar</span>
          <strong>
            {filteredRecords
              .reduce((total, record) => total + (Number.parseFloat(record.valorMonto) || 0), 0)
              .toFixed(2)}
          </strong>
        </div>
      </div>

      <EditRecordModal
        clientOptions={clientOptions}
        editValues={editingRecord}
        isUpdatingRecord={isUpdatingRecord}
        onChange={handleEditChange}
        onClose={() => setEditingRecord(null)}
        responsibleOptions={responsibleOptions}
        routeOptions={routeOptions}
        onSubmit={handleEditSubmit}
        statusOptions={statusOptions}
        subrouteOptions={subrouteOptions}
        updateRecordError={updateRecordError}
        vehicleOptions={vehicleOptions}
      />
    </div>
  );
}

function CatalogsManager({
  catalogs,
  catalogsError,
  catalogOperationError,
  isLoadingCatalogs,
  isSavingCatalogItem,
  onCreateCatalogItem,
  onDeleteCatalogItem,
  onUpdateCatalogItem,
}) {
  const [activeCatalogKey, setActiveCatalogKey] = useState(catalogDefinitions[0].key);
  const [newItemName, setNewItemName] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState("");

  const activeCatalog =
    catalogDefinitions.find((catalog) => catalog.key === activeCatalogKey) ?? catalogDefinitions[0];
  const activeItems = catalogs[activeCatalog.key] ?? [];

  const handleCreate = (event) => {
    event.preventDefault();
    Promise.resolve(onCreateCatalogItem?.(activeCatalog.key, newItemName))
      .then(() => {
        setNewItemName("");
      })
      .catch(() => {});
  };

  const handleStartEdit = (item) => {
    setEditingItemId(item.id);
    setEditingItemName(item.name);
  };

  const handleSaveEdit = (itemId) => {
    Promise.resolve(onUpdateCatalogItem?.(activeCatalog.key, itemId, editingItemName))
      .then(() => {
        setEditingItemId(null);
        setEditingItemName("");
      })
      .catch(() => {});
  };

  const handleDelete = (itemId) => {
    Promise.resolve(onDeleteCatalogItem?.(activeCatalog.key, itemId)).catch(() => {});
  };

  return (
    <div className="catalogs-manager">
      {isLoadingCatalogs ? <p className="status-message">Cargando catalogos...</p> : null}
      {!isLoadingCatalogs && catalogsError ? (
        <p className="status-message error">{catalogsError}</p>
      ) : null}
      {catalogOperationError ? <p className="status-message error">{catalogOperationError}</p> : null}

      <div className="catalog-tabs">
        {catalogDefinitions.map((catalog) => (
          <button
            key={catalog.key}
            className={`catalog-tab ${catalog.key === activeCatalog.key ? "active" : ""}`}
            type="button"
            onClick={() => {
              setActiveCatalogKey(catalog.key);
              setEditingItemId(null);
              setEditingItemName("");
              setNewItemName("");
            }}
          >
            {catalog.label}
          </button>
        ))}
      </div>

      <div className="catalog-panel">
        <div className="catalog-panel-header">
          <div>
            <p className="section-label">Catalogo activo</p>
            <h3>{activeCatalog.label}</h3>
            <p className="catalog-description">{activeCatalog.description}</p>
          </div>
        </div>

        <form className="catalog-create-form" onSubmit={handleCreate}>
          <label className="form-field">
            <span>Nuevo elemento</span>
            <input
              type="text"
              value={newItemName}
              onChange={(event) => setNewItemName(event.target.value)}
              placeholder={`Agregar a ${activeCatalog.label.toLowerCase()}`}
            />
          </label>
          <button className="primary-action" type="submit" disabled={isSavingCatalogItem}>
            {isSavingCatalogItem ? "Guardando..." : "Agregar"}
          </button>
        </form>

        <div className="catalog-list">
          {activeItems.map((item) => (
            <div key={item.id} className="catalog-row">
              {editingItemId === item.id ? (
                <input
                  className="catalog-edit-input"
                  type="text"
                  value={editingItemName}
                  onChange={(event) => setEditingItemName(event.target.value)}
                />
              ) : (
                <div>
                  <strong>{item.name}</strong>
                </div>
              )}

              <div className="catalog-row-actions">
                {editingItemId === item.id ? (
                  <button
                    className="icon-action edit-action"
                    type="button"
                    disabled={isSavingCatalogItem}
                    onClick={() => handleSaveEdit(item.id)}
                  >
                    {isSavingCatalogItem ? "..." : "OK"}
                  </button>
                ) : (
                  <button
                    className="icon-action edit-action"
                    type="button"
                    disabled={isSavingCatalogItem}
                    onClick={() => handleStartEdit(item)}
                  >
                    E
                  </button>
                )}

                <button
                  className="icon-action delete-action"
                  type="button"
                  disabled={isSavingCatalogItem}
                  onClick={() => handleDelete(item.id)}
                >
                  {isSavingCatalogItem ? "..." : "X"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeroCard({
  catalogs,
  catalogsError,
  catalogOperationError,
  currentSection,
  deleteRecordError,
  isDeletingRecord,
  isLoadingCatalogs,
  isLoadingRecords,
  isSavingCatalogItem,
  isSavingRecord,
  isUpdatingRecord,
  onCreateCatalogItem,
  onDeleteCatalogItem,
  onDeleteRecord,
  onSaveRecord,
  onUpdateCatalogItem,
  onUpdateRecord,
  records = [],
  recordsError,
  saveRecordError,
  updateRecordError,
}) {
  const isHomeSection = currentSection.id === "inicio";
  const isReportsSection = currentSection.id === "reportes";
  const isCatalogsSection = currentSection.id === "catalogos";
  const [formValues, setFormValues] = useState(getInitialFormValues);
  const [recordValidationError, setRecordValidationError] = useState("");

  const clientOptions = useMemo(
    () => [...(catalogs.clientes ?? []).map((item) => item.name), "__new__"],
    [catalogs]
  );
  const routeOptions = useMemo(
    () => [...(catalogs.rutas ?? []).map((item) => item.name), "__new__"],
    [catalogs]
  );
  const subrouteOptions = useMemo(
    () => [...(catalogs.subrutas ?? []).map((item) => item.name), "__new__"],
    [catalogs]
  );
  const responsibleOptions = useMemo(
    () => [...(catalogs.responsables ?? []).map((item) => item.name), "__new__"],
    [catalogs]
  );
  const statusOptions = useMemo(
    () => [...(catalogs.estados ?? []).map((item) => item.name), "__new__"],
    [catalogs]
  );
  const vehicleOptions = useMemo(
    () => [...(catalogs.vehiculos ?? []).map((item) => item.name), "__new__"],
    [catalogs]
  );

  const currentDay = useMemo(() => getDayFromDate(formValues.fecha), [formValues.fecha]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const record = {
      fecha: formValues.fecha,
      dia: currentDay,
      clienteEmpresa: resolveFieldValue(
        formValues.clienteEmpresa,
        formValues.clienteEmpresaNuevo
      ),
      rutaDestino: resolveFieldValue(formValues.rutaDestino, formValues.rutaDestinoNueva),
      subrutaPuntoLocal: resolveFieldValue(
        formValues.subrutaPuntoLocal,
        formValues.subrutaPuntoLocalNueva
      ),
      responsableAsignado: resolveFieldValue(
        formValues.responsableAsignado,
        formValues.responsableAsignadoNuevo
      ),
      estado: resolveFieldValue(formValues.estado, formValues.estadoNuevo),
      observaciones: formValues.observaciones.trim(),
      valorMonto: formValues.valorMonto,
      numeroPedidos: formValues.numeroPedidos,
      adelanto: formValues.adelanto,
      placaVehiculo: resolveFieldValue(
        formValues.placaVehiculo,
        formValues.placaVehiculoNueva
      ),
    };

    if (!record.clienteEmpresa || !record.rutaDestino || !record.estado) {
      const missingFields = [
        !record.clienteEmpresa ? "cliente/empresa" : null,
        !record.rutaDestino ? "ruta/destino" : null,
        !record.estado ? "estado" : null,
      ].filter(Boolean);

      console.warn("[Viajes] create blocked: missing required fields", {
        missingFields,
        record,
      });
      setRecordValidationError(
        `Completa los campos requeridos: ${missingFields.join(", ")}.`
      );
      return;
    }

    try {
      setRecordValidationError("");
      await onSaveRecord?.(record);
      setFormValues(getInitialFormValues());
    } catch (error) {
      // The error message is rendered by the parent container.
    }
  };

  return (
    <article className="hero-card">
      <p className="section-label">Modulo seleccionado</p>
      <h2>{currentSection.label}</h2>

      {isHomeSection ? (
        <div className="quick-entry">
          {isLoadingCatalogs ? <p className="status-message">Cargando catalogos...</p> : null}
          {!isLoadingCatalogs && catalogsError ? (
            <p className="status-message error">{catalogsError}</p>
          ) : null}
          {recordValidationError ? (
            <p className="status-message error">{recordValidationError}</p>
          ) : null}
          {saveRecordError ? <p className="status-message error">{saveRecordError}</p> : null}

          <form className="registro-form" onSubmit={handleSubmit}>
            <div className="registro-form-grid">
              <label className="form-field">
                <span>Fecha</span>
                <input
                  name="fecha"
                  type="date"
                  required
                  value={formValues.fecha}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Dia</span>
                <input type="text" value={currentDay} readOnly />
              </label>

              <SelectOrInputField
                label="Cliente / empresa"
                inputName="clienteEmpresaNuevo"
                options={clientOptions}
                selectName="clienteEmpresa"
                selectValue={formValues.clienteEmpresa}
                textValue={formValues.clienteEmpresaNuevo}
                onChange={handleChange}
              />

              <SelectOrInputField
                label="Ruta o destino"
                inputName="rutaDestinoNueva"
                options={routeOptions}
                selectName="rutaDestino"
                selectValue={formValues.rutaDestino}
                textValue={formValues.rutaDestinoNueva}
                onChange={handleChange}
              />

              <SelectOrInputField
                label="Subruta / punto / local"
                inputName="subrutaPuntoLocalNueva"
                options={subrouteOptions}
                selectName="subrutaPuntoLocal"
                selectValue={formValues.subrutaPuntoLocal}
                textValue={formValues.subrutaPuntoLocalNueva}
                onChange={handleChange}
              />

              <SelectOrInputField
                label="Responsable / conductor / persona asignada"
                inputName="responsableAsignadoNuevo"
                options={responsibleOptions}
                selectName="responsableAsignado"
                selectValue={formValues.responsableAsignado}
                textValue={formValues.responsableAsignadoNuevo}
                onChange={handleChange}
              />

              <SelectOrInputField
                label="Estado"
                inputName="estadoNuevo"
                options={statusOptions}
                selectName="estado"
                selectValue={formValues.estado}
                textValue={formValues.estadoNuevo}
                onChange={handleChange}
              />

              <label className="form-field">
                <span>Valor o monto</span>
                <input
                  name="valorMonto"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formValues.valorMonto}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Adelanto</span>
                <input
                  name="adelanto"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formValues.adelanto}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Numero de pedidos</span>
                <input
                  name="numeroPedidos"
                  type="number"
                  min="0"
                  step="1"
                  value={formValues.numeroPedidos}
                  onChange={handleChange}
                />
              </label>

              <SelectOrInputField
                label="Placa del vehiculo"
                inputName="placaVehiculoNueva"
                options={vehicleOptions}
                selectName="placaVehiculo"
                selectValue={formValues.placaVehiculo}
                textValue={formValues.placaVehiculoNueva}
                onChange={handleChange}
              />

              <label className="form-field form-field-wide">
                <span>Observaciones</span>
                <textarea
                  name="observaciones"
                  rows="4"
                  value={formValues.observaciones}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-actions">
              <button className="primary-action" type="submit" disabled={isSavingRecord}>
                {isSavingRecord ? "Guardando..." : "Guardar registro"}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {isReportsSection ? (
        <ReportsPreview
          clientOptions={(catalogs.clientes ?? []).map((item) => item.name)}
          deleteRecordError={deleteRecordError}
          isDeletingRecord={isDeletingRecord}
          isLoadingRecords={isLoadingRecords}
          isUpdatingRecord={isUpdatingRecord}
          records={records}
          onDeleteRecord={onDeleteRecord}
          onUpdateRecord={onUpdateRecord}
          recordsError={recordsError}
          responsibleOptions={(catalogs.responsables ?? []).map((item) => item.name)}
          routeOptions={(catalogs.rutas ?? []).map((item) => item.name)}
          statusOptions={(catalogs.estados ?? []).map((item) => item.name)}
          subrouteOptions={(catalogs.subrutas ?? []).map((item) => item.name)}
          updateRecordError={updateRecordError}
          vehicleOptions={(catalogs.vehiculos ?? []).map((item) => item.name)}
        />
      ) : null}

      {isCatalogsSection ? (
        <CatalogsManager
          catalogs={catalogs}
          catalogsError={catalogsError}
          catalogOperationError={catalogOperationError}
          isLoadingCatalogs={isLoadingCatalogs}
          isSavingCatalogItem={isSavingCatalogItem}
          onCreateCatalogItem={onCreateCatalogItem}
          onDeleteCatalogItem={onDeleteCatalogItem}
          onUpdateCatalogItem={onUpdateCatalogItem}
        />
      ) : null}

      {!isHomeSection && !isReportsSection && !isCatalogsSection ? (
        <p>
          Este espacio queda listo para conectar componentes reales, tablas,
          formularios o graficos segun la pantalla elegida.
        </p>
      ) : null}
    </article>
  );
}

export default SectionHeroCard;
