import { useEffect, useState } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [dark, setDark] = useState(false);

  // cargar preferencia
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);

    if (newTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="navbar">
      <span className="brand">📝 Notes App</span>

      <button className="theme-btn" onClick={toggleTheme}>
        {dark ? "☀ Light mode" : "🌙 Dark mode"}
      </button>
    </nav>
  );
}
export default Navbar;
