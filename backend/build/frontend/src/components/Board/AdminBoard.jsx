import { useState, useEffect } from "react";
import UserService from "../../services/userService";

function AdminBoard() {
    const [content, setContent] = useState("");
    const userServiceInstance = new UserService();


  useEffect(() => {
    userServiceInstance.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
    return ( 
        <>
        <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <sidebar className="sideBarAdmin">
        <ul>
          <li>Gestion des Sessions</li>
          <li>Gestion des Enfants</li>
          <li>Gestion des Utilisateus</li>
          
        </ul>
      </sidebar>
    </div>
        </>
     );
}

export default AdminBoard;