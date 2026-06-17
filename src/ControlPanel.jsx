import { useState } from "react";
import ContentPanel from "./components/control-panel/ContentPanel.jsx";
import MobileMenuButton from "./components/control-panel/MobileMenuButton.jsx";
import Sidebar from "./components/control-panel/Sidebar.jsx";
import { dummyCatalogs } from "./data/dummyCatalogs.js";
import { controlPanelSections } from "./data/controlPanelSections.js";
import { dummyReports } from "./data/dummyReports.js";
import "./ControlPanel.css";

function ControlPanel({ onLogout }) {
  const [activeSection, setActiveSection] = useState(controlPanelSections[0].id);
  const [isSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [records, setRecords] = useState(dummyReports);
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

  const handleSaveRecord = (record) => {
    setRecords((current) => [
      {
        ...record,
        id: Date.now(),
      },
      ...current,
    ]);
    setActiveSection("reportes");
  };

  const handleDeleteRecord = (recordId) => {
    setRecords((current) => current.filter((record) => record.id !== recordId));
  };

  const handleUpdateRecord = (updatedRecord) => {
    setRecords((current) =>
      current.map((record) => (record.id === updatedRecord.id ? updatedRecord : record))
    );
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
        records={records}
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
