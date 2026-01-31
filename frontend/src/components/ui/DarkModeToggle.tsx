import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.body.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggle = () => {
    const isDark = !dark;
    setDark(isDark);

    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      className="theme-btn btn btn-outline-secondary btn-sm"
      onClick={toggle}
    >
      {dark ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
};

export default DarkModeToggle;
