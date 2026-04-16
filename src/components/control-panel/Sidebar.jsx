import SidebarUser from "./SidebarUser.jsx";
import SidebarNav from "./SidebarNav.jsx";
import SidebarFooter from "./SidebarFooter.jsx";

function Sidebar({
  activeSection,
  activeUser,
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
      <SidebarUser activeUser={activeUser} />

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
