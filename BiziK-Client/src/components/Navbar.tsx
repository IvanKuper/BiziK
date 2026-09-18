import { FunctionComponent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbackService";
import { getBiz } from "../services/userService";
import { useDarkMode } from "../hooks/useDarkMode";
import { LogOut, Menu, Moon, Sun, X } from "lucide-react";

interface NavbarProps {}

const linkBase =
  "block rounded-lg px-3 py-2 text-sm font-medium transition-colors";
const linkClass = ({ isActive }: { isActive: boolean }) =>
  `${linkBase} ${
    isActive
      ? "bg-primary-600 text-white"
      : "text-slate-100 hover:bg-white/10 hover:text-white"
  }`;

const Navbar: FunctionComponent<NavbarProps> = () => {
  const navigate = useNavigate();
  const { isDark, toggleDark } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    successMsg("Hope To See You Again");
    setMenuOpen(false);
    navigate("/");
  };

  // Checks if User Is Biz
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      setUser(false);
      return;
    }
    setUser(Boolean(getBiz()));
  }, []);

  const isLogged = sessionStorage.getItem("token");

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-primary-700 via-primary-600 to-violet-600 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink
          to="/my-cards"
          className="flex items-center gap-2 text-white"
          onClick={() => setMenuOpen(false)}
        >
          <img className="h-10 w-10 drop-shadow" src="/Logo.png" alt="logo" />
          <span className="text-2xl font-extrabold tracking-tight drop-shadow">
            BiziK
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {user ? (
            <>
              <NavLink to="/new-card" className={linkClass}>
                Create New Card
              </NavLink>
              <NavLink to="/my-cards" className={linkClass}>
                My BizCards
              </NavLink>
            </>
          ) : null}
          {isLogged ? (
            <>
              <NavLink to="/all-cards" className={linkClass}>
                All BiziK Cards
              </NavLink>
              <NavLink to="/profile" className={linkClass}>
                My Profile
              </NavLink>
              <NavLink to="/about" className={linkClass}>
                About Bizik
              </NavLink>
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center gap-1.5 rounded-lg bg-slate-900/30 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-900/50"
              >
                <LogOut size={16} /> Say Bye
              </button>
            </>
          ) : null}
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="ml-2 rounded-lg p-2 text-white transition-colors hover:bg-white/10"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 bg-primary-700/95 px-4 pb-4 pt-1">
          {user ? (
            <>
              <NavLink
                to="/new-card"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                Create New Card
              </NavLink>
              <NavLink
                to="/my-cards"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                My BizCards
              </NavLink>
            </>
          ) : null}
          {isLogged ? (
            <>
              <NavLink
                to="/all-cards"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                All BiziK Cards
              </NavLink>
              <NavLink
                to="/profile"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                My Profile
              </NavLink>
              <NavLink
                to="/about"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                About Bizik
              </NavLink>
              <button
                onClick={handleLogout}
                className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-slate-900/30 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-900/50"
              >
                <LogOut size={16} /> Say Bye
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
