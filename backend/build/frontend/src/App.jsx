import { Outlet } from "react-router-dom";
import './App.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import AuthService from "./services/authService";



function App() {
  const [showModeratorBoard, setShowReferentBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);


  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowReferentBoard(user.roles.includes("ROLE_REFER"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  
  return (
    <>
     <nav className="header">
            <h1><Link to="/home">La Fosse aux Fraises</Link></h1>
            <ul>
                

               
              {setCurrentUser && (
            <li className="nav-item">
              <Link to={"/anim"} className="nav-link">
                Animateur Board
              </Link>
            </li>
            
          )}
               
              {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/refer"} className="nav-link">
                Referent Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          
          {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Connexion
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Inscription
              </Link>
            </li>
          </div>
        )}
            </ul>
        </nav>
      <Outlet />
      </>
    
  );
}

export default App;
