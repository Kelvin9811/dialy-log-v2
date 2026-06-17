import SidebarNav from "./SidebarNav.jsx";
import SidebarFooter from "./SidebarFooter.jsx";

function Sidebar({
  activeSection,
  isMobileMenuOpen,
  isSidebarCollapsed,
  onLogout,
  onSelectSection,
  sections,
}) {
  return (
    <aside
      id="mobile-sidebar"
      className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""} ${
        isMobileMenuOpen ? "mobile-open" : ""
      }`}
    >
      <SidebarNav
        sections={sections}
        activeSection={activeSection}
        onSelectSection={onSelectSection}
      />

      <SidebarFooter onLogout={onLogout} />
    </aside>
  );
}

export default Sidebar;
