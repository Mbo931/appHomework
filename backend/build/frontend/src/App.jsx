import { Outlet } from "react-router-dom";
import './App.css';
import { Link } from "react-router-dom";

function App() {
  
  return (
    <>
     <nav className="header">
            <h1><Link to="/home">La Fosse aux Fraises</Link></h1>
            <ul>
                <li><Link to="/login">Connexion</Link></li>
                <li><Link to="/register">Création de compte</Link></li>
            </ul>
        </nav>
      <Outlet />
      </>
    
  );
}

export default App;
