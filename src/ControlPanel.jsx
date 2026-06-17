import { useEffect, useState } from "react";
import ContentPanel from "./components/control-panel/ContentPanel.jsx";
import MobileMenuButton from "./components/control-panel/MobileMenuButton.jsx";
import Sidebar from "./components/control-panel/Sidebar.jsx";
import { dummyCatalogs } from "./data/dummyCatalogs.js";
import { controlPanelSections } from "./data/controlPanelSections.js";
import {
  createViajeRecord,
  deleteViajeRecord,
  fetchViajes,
  updateViajeRecord,
} from "./lib/viajes.js";
import "./ControlPanel.css";

function ControlPanel({ onLogout }) {
  const [activeSection, setActiveSection] = useState(controlPanelSections[0].id);
  const [isSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [recordsError, setRecordsError] = useState("");
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [isSavingRecord, setIsSavingRecord] = useState(false);
  const [saveRecordError, setSaveRecordError] = useState("");
  const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);
  const [updateRecordError, setUpdateRecordError] = useState("");
  const [isDeletingRecord, setIsDeletingRecord] = useState(false);
  const [deleteRecordError, setDeleteRecordError] = useState("");
  const [catalogs, setCatalogs] = useState(dummyCatalogs);

  const currentSection =
    controlPanelSections.find((section) => section.id === activeSection) ??
    controlPanelSections[0];

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((current) => !current);
  };

  const handleSelectSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    onLogout?.();
  };

  useEffect(() => {
    let isMounted = true;

    const loadViajes = async () => {
      setIsLoadingRecords(true);
      setRecordsError("");

      try {
        const viajes = await fetchViajes();

        if (!isMounted) {
          return;
        }

        setRecords(viajes);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setRecords([]);
        setRecordsError("No se pudieron cargar los viajes desde el API.");
      } finally {
        if (isMounted) {
          setIsLoadingRecords(false);
        }
      }
    };

    loadViajes();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveRecord = async (record) => {
    setIsSavingRecord(true);
    setSaveRecordError("");

    try {
      const createdRecord = await createViajeRecord(record);

      setRecords((current) => [createdRecord, ...current]);
      setActiveSection("reportes");
    } catch (error) {
      setSaveRecordError("No se pudo guardar el viaje en el API.");
      throw error;
    } finally {
      setIsSavingRecord(false);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    setIsDeletingRecord(true);
    setDeleteRecordError("");

    try {
      const deletedId = await deleteViajeRecord(recordId);
      setRecords((current) => current.filter((record) => record.id !== deletedId));
    } catch (error) {
      setDeleteRecordError("No se pudo eliminar el viaje del API.");
      throw error;
    } finally {
      setIsDeletingRecord(false);
    }
  };

  const handleUpdateRecord = async (updatedRecord) => {
    setIsUpdatingRecord(true);
    setUpdateRecordError("");

    try {
      const savedRecord = await updateViajeRecord(updatedRecord);
      setRecords((current) =>
        current.map((record) => (record.id === savedRecord.id ? savedRecord : record))
      );
    } catch (error) {
      setUpdateRecordError("No se pudo actualizar el viaje en el API.");
      throw error;
    } finally {
      setIsUpdatingRecord(false);
    }
  };

  const handleCreateCatalogItem = (catalogKey, itemName) => {
    const trimmedName = itemName.trim();

    if (!trimmedName) {
      return;
    }

    setCatalogs((current) => ({
      ...current,
      [catalogKey]: [
        ...current[catalogKey],
        {
          id: Date.now(),
          name: trimmedName,
        },
      ],
    }));
  };

  const handleUpdateCatalogItem = (catalogKey, itemId, itemName) => {
    const trimmedName = itemName.trim();

    if (!trimmedName) {
      return;
    }

    setCatalogs((current) => ({
      ...current,
      [catalogKey]: current[catalogKey].map((item) =>
        item.id === itemId ? { ...item, name: trimmedName } : item
      ),
    }));
  };

  const handleDeleteCatalogItem = (catalogKey, itemId) => {
    setCatalogs((current) => ({
      ...current,
      [catalogKey]: current[catalogKey].filter((item) => item.id !== itemId),
    }));
  };

  return (
    <main className="dashboard-shell">
      <MobileMenuButton isOpen={isMobileMenuOpen} onToggle={handleToggleMobileMenu} />

      <Sidebar
        sections={controlPanelSections}
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        onLogout={handleLogout}
        onSelectSection={handleSelectSection}
      />

      <ContentPanel
        catalogs={catalogs}
        currentSection={currentSection}
        deleteRecordError={deleteRecordError}
        isDeletingRecord={isDeletingRecord}
        isLoadingRecords={isLoadingRecords}
        isSavingRecord={isSavingRecord}
        isUpdatingRecord={isUpdatingRecord}
        recordsError={recordsError}
        records={records}
        saveRecordError={saveRecordError}
        updateRecordError={updateRecordError}
        onCreateCatalogItem={handleCreateCatalogItem}
        onDeleteCatalogItem={handleDeleteCatalogItem}
        onDeleteRecord={handleDeleteRecord}
        onSaveRecord={handleSaveRecord}
        onUpdateCatalogItem={handleUpdateCatalogItem}
        onUpdateRecord={handleUpdateRecord}
      />
    </main>
  );
}

export default ControlPanel;
