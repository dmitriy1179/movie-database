import React from "react";
import { NavLink } from "react-router";
import useTheme from "../context/ThemeContext";

const Header = () => {
  const closeBtnRef = React.useRef(null);

  const { isDarkTheme, toggleTheme } = useTheme();

  const closeMenu = () => {
    if (closeBtnRef.current) {
      closeBtnRef.current.click();
    }
  };

  return (
    <header>
      <nav className="navbar bg-body-secondary navbar-expand-lg fixed-top px-1 px-md-3 px-lg-5">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">Search on TMDB</NavLink>
          <button
            className="navbar-toggler"
            style={{ boxShadow: "unset" }}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header gap-2">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Search on TMDB</h5>

              <div className="form-check form-switch ms-auto mb-0">
                <input
                  className="form-check-input custom-theme-switch"
                  type="checkbox"
                  role="switch"
                  id="themeSwitch"
                  checked={isDarkTheme}
                  onChange={toggleTheme}
                  style={{ cursor: "pointer" }}
                />
                <label className="form-check-label" htmlFor="themeSwitch">
                  {/* {isDarkTheme ? "Dark" : "Light"} */}
                </label>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                className="btn-close btn-close--mod"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body gap-5">
              <ul className="navbar-nav justify-content-end flex-grow-1">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link"
                    aria-current="page"
                    onClick={closeMenu}
                  >
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/people"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    People
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/tv"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    TV
                  </NavLink>
                </li>
              </ul>

              <div className="form-check form-switch align-self-center d-none d-lg-block">
                <input
                  className="form-check-input custom-theme-switch"
                  type="checkbox"
                  role="switch"
                  id="themeSwitch"
                  checked={isDarkTheme}
                  onChange={toggleTheme}
                  style={{ cursor: "pointer" }}
                />
                <label className="form-check-label" htmlFor="themeSwitch">
                  {/* {isDarkTheme ? "Dark" : "Light"} */}
                </label>
              </div>

            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;