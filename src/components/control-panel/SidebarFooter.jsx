function SidebarFooter({ onLogout }) {
  return (
    <div className="sidebar-footer">
      <button className="nav-item logout-item" type="button" onClick={onLogout}>
        <span className="nav-icon" aria-hidden="true">
          X
        </span>
        <span className="nav-copy">
          <span className="nav-label">Cerrar sesion</span>
        </span>
      </button>
    </div>
  );
}

export default SidebarFooter;
