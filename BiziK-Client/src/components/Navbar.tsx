import { FunctionComponent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbackService";
import { getBiz } from "../services/userService";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    successMsg("Hope To See You Again");
    navigate("/");
  };

  // Checks if User Is Biz
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    setUser(getBiz());
  }, []);

  const isLogged = sessionStorage.getItem("token");

  return (
    <>
      {/* Nav Bar */}

      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container ">
          <div className="navbar-brand navbar-title ">
            <NavLink className="nav-link text-white" to="/my-cards">
              <img className="logo mx-4" src="/Logo.png" alt="logo" />
              <span className="bizName text-white">BiziK</span>
            </NavLink>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="row">
            <div
              className="offcanvas offcanvas-end"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  Menu
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  {/* Business Links */}
                  {user ? (
                    <>
                      <li className="nav-item ">
                        <NavLink className="nav-link text-white" to="/new-card">
                          <span>Create New Card</span>
                        </NavLink>
                      </li>
                      <li className="nav-item ">
                        <NavLink className="nav-link text-white" to="/my-cards">
                          <span>My BizCards</span>
                        </NavLink>
                      </li>
                    </>
                  ) : null}
                  {/* LogeedIn Links */}
                  {isLogged ? (
                    <>
                      <li className="nav-item ">
                        <NavLink
                          className="nav-link text-white"
                          to="/all-cards"
                        >
                          <span>All BiziK Cards</span>
                        </NavLink>
                      </li>
                      <li className="nav-item ">
                        <NavLink className="nav-link text-white" to="/profile">
                          <span>My Profile</span>
                        </NavLink>
                      </li>
                      <li className="nav-item ">
                        <NavLink className="nav-link text-white" to="/about">
                          <span>About Bizik</span>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <button
                          onClick={handleLogout}
                          className="btn btn-dark mt-1"
                        >
                          <i className="fa-solid fa-person-walking-arrow-right"></i>
                          Say Bye
                        </button>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
