import { useMemo, useState } from "react";
import { catalogDefinitions } from "../../data/dummyCatalogs.js";

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

function EditRecordModal({ editValues, onChange, onClose, onSubmit, statusOptions }) {
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
              <input
                name="clienteEmpresa"
                type="text"
                value={editValues.clienteEmpresa}
                onChange={onChange}
              />
            </label>

            <label className="form-field">
              <span>Ruta o destino</span>
              <input
                name="rutaDestino"
                type="text"
                value={editValues.rutaDestino}
                onChange={onChange}
              />
            </label>

            <label className="form-field">
              <span>Subruta / punto / local</span>
              <input
                name="subrutaPuntoLocal"
                type="text"
                value={editValues.subrutaPuntoLocal}
                onChange={onChange}
              />
            </label>

            <label className="form-field">
              <span>Responsable / conductor / persona asignada</span>
              <input
                name="responsableAsignado"
                type="text"
                value={editValues.responsableAsignado}
                onChange={onChange}
              />
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
              <input
                name="placaVehiculo"
                type="text"
                value={editValues.placaVehiculo}
                onChange={onChange}
              />
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
            <button className="primary-action" type="submit">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ReportsPreview({ onDeleteRecord, onUpdateRecord, records, statusOptions }) {
  const [filters, setFilters] = useState({
    fecha: "",
    cliente: "",
    placa: "",
  });
  const [editingRecord, setEditingRecord] = useState(null);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesFecha = !filters.fecha || record.fecha === filters.fecha;
      const matchesCliente =
        !filters.cliente ||
        (record.clienteEmpresa ?? "")
          .toLowerCase()
          .includes(filters.cliente.trim().toLowerCase());
      const matchesPlaca =
        !filters.placa ||
        (record.placaVehiculo ?? "").toLowerCase().includes(filters.placa.trim().toLowerCase());

      return matchesFecha && matchesCliente && matchesPlaca;
    });
  }, [filters, records]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditingRecord((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    onUpdateRecord?.({
      ...editingRecord,
      dia: getDayFromDate(editingRecord.fecha),
    });
    setEditingRecord(null);
  };

  return (
    <div className="reports-preview">
      <div className="reports-filters">
        <label className="form-field">
          <span>Filtrar por fecha</span>
          <input
            name="fecha"
            type="date"
            value={filters.fecha}
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
                      onClick={() => onDeleteRecord?.(record.id)}
                    >
                      X
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="10" className="empty-report-cell">
                  No hay registros que coincidan con los filtros.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="reports-summary-grid">
        <div className="report-summary-card">
          <span>Total registros</span>
          <strong>{filteredRecords.length}</strong>
        </div>
        <div className="report-summary-card">
          <span>Entregados</span>
          <strong>{filteredRecords.filter((record) => record.estado === "Entregado").length}</strong>
        </div>
        <div className="report-summary-card">
          <span>Pendientes</span>
          <strong>{filteredRecords.filter((record) => record.estado === "Pendiente").length}</strong>
        </div>
      </div>

      <EditRecordModal
        editValues={editingRecord}
        onChange={handleEditChange}
        onClose={() => setEditingRecord(null)}
        onSubmit={handleEditSubmit}
        statusOptions={statusOptions}
      />
    </div>
  );
}

function CatalogsManager({
  catalogs,
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
    onCreateCatalogItem?.(activeCatalog.key, newItemName);
    setNewItemName("");
  };

  const handleStartEdit = (item) => {
    setEditingItemId(item.id);
    setEditingItemName(item.name);
  };

  const handleSaveEdit = (itemId) => {
    onUpdateCatalogItem?.(activeCatalog.key, itemId, editingItemName);
    setEditingItemId(null);
    setEditingItemName("");
  };

  return (
    <div className="catalogs-manager">
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
          <button className="primary-action" type="submit">
            Agregar
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
                    onClick={() => handleSaveEdit(item.id)}
                  >
                    OK
                  </button>
                ) : (
                  <button
                    className="icon-action edit-action"
                    type="button"
                    onClick={() => handleStartEdit(item)}
                  >
                    E
                  </button>
                )}

                <button
                  className="icon-action delete-action"
                  type="button"
                  onClick={() => onDeleteCatalogItem?.(activeCatalog.key, item.id)}
                >
                  X
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
  currentSection,
  onCreateCatalogItem,
  onDeleteCatalogItem,
  onDeleteRecord,
  onSaveRecord,
  onUpdateCatalogItem,
  onUpdateRecord,
  records = [],
}) {
  const isHomeSection = currentSection.id === "inicio";
  const isReportsSection = currentSection.id === "reportes";
  const isCatalogsSection = currentSection.id === "catalogos";
  const [formValues, setFormValues] = useState(getInitialFormValues);

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

  const handleSubmit = (event) => {
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
      placaVehiculo: resolveFieldValue(
        formValues.placaVehiculo,
        formValues.placaVehiculoNueva
      ),
    };

    onSaveRecord?.(record);
    setFormValues(getInitialFormValues());
  };

  return (
    <article className="hero-card">
      <p className="section-label">Modulo seleccionado</p>
      <h2>{currentSection.label}</h2>

      {isHomeSection ? (
        <div className="quick-entry">
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
              <button className="primary-action" type="submit">
                Guardar registro
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {isReportsSection ? (
        <ReportsPreview
          records={records}
          onDeleteRecord={onDeleteRecord}
          onUpdateRecord={onUpdateRecord}
          statusOptions={(catalogs.estados ?? []).map((item) => item.name)}
        />
      ) : null}

      {isCatalogsSection ? (
        <CatalogsManager
          catalogs={catalogs}
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
