function SidebarNav({ sections, activeSection, onSelectSection }) {
  return (
    <nav className="sidebar-nav" aria-label="Navegacion principal">
      {sections.map((section) => {
        const isActive = section.id === activeSection;

        return (
          <button
            key={section.id}
            className={`nav-item ${isActive ? "active" : ""}`}
            type="button"
            onClick={() => onSelectSection(section.id)}
          >
            <span className="nav-icon" aria-hidden="true">
              {section.icon}
            </span>
            <span className="nav-copy">
              <span className="nav-label">{section.label}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default SidebarNav;
