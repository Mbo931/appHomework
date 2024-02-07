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
    </div>
        </>
     );
}

export default AdminBoard;