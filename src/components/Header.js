import React from "react";
import { useAuth0 } from "../contexts/auth0-context";
import "./Header.css";

export default function Header() {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

  return (
    <header>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-menu is-active">
            {/* logo */}
            <div className="navbar-brand">
              <div class="button">
                <a
                  id="link"
                  href="https://forms.gle/Kn9W4fVj3mG1TJK58"
                  target="_blank"
                >
                  Fyll i enkät!
                </a>
              </div>
            </div>

            {/* menu items */}
            <div className="navbar-end">
              {/* if there is no user. show the login button */}

              {/* if there is a user. show user name and logout button */}
              {!isLoading && user && (
                <>
                  <button className="navbar-item">{user.name}</button>
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="navbar-item"
                  >
                    Logga ut
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
