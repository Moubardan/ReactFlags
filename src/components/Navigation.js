import { NavLink } from "react-router-dom";
function Navigation() {
  return (
    <div className="navigation">
      <NavLink to="/" className="nav-active">
        Accueil
      </NavLink>
      <NavLink to="/a-propos" className="nav-active">
        A propos
      </NavLink>
    </div>
  );
}

export default Navigation;
