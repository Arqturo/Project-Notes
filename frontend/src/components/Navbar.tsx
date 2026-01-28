import "../styles/navbar.css";

function Navbar() {
  const toggleDark = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <nav className="navbar">
      <span>Notes App</span>
      <button onClick={toggleDark}>🌙</button>
    </nav>
  );
}

export default Navbar;
