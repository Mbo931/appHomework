import React, { useState, useEffect } from "react";
import UserService from "../services/userService";
import ChildrenDetail from "./ChildrenDetail";
import ListChildren from "./ListChildren";

function Home() {

  const [content, setContent] = useState("");
  const userServiceInstance = new UserService();

  useEffect(() => {
    userServiceInstance.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <ListChildren/>
      </header>
    </div>
  );
}

export default Home;