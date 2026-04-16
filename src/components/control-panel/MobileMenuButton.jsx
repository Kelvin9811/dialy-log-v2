import hamburgerIcon from "../../img/Hamburger_icon.svg.png";

function MobileMenuButton({ isOpen, onToggle }) {
  return (
    <button
      className="mobile-menu-button"
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="mobile-sidebar"
    >
      <img className="hamburger-icon" src={hamburgerIcon} alt="" aria-hidden="true" />
      <span>{isOpen ? "Cerrar menu" : "Abrir menu"}</span>
    </button>
  );
}

export default MobileMenuButton;
