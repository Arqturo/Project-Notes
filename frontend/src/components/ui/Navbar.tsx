import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-4">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">📝 Project Notes</span>

        <div className="collapse navbar-collapse show">
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
