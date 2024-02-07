import { useState, useEffect } from "react";
import UserService from "../../services/userService";


function ReferentBoard() {
    const [content, setContent] = useState("");
    const userServiceInstance = new UserService();


  useEffect(() => {
    userServiceInstance.getReferentBoard().then(
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
     );;
}

export default ReferentBoard;