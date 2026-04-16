function SidebarUser({ activeUser }) {
  if (!activeUser) {
    return null;
  }

  return (
    <div className="sidebar-user">
      <span className="sidebar-user-label">Usuario</span>
      <strong>{activeUser}</strong>
    </div>
  );
}

export default SidebarUser;
