import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const location = useLocation(); // Para saber en qué ruta estamos

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        RSS Reader
      </Link>
      <div className="navbar-nav">
        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
          Inicio
        </Link>
        <Link className={`nav-link ${location.pathname === "/feeds" ? "active" : ""}`} to="/feeds">
          Agregar Feed
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
