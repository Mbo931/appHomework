import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ChildrenService from "../services/ChildrenService";
import ChildrenCard from "./ChildrenCard";

function ListChildren() {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    ChildrenService.getFindAllChildren()
      .then(response => {
        setChildren(response.data); // Supposons que `response.data` est le tableau d'objets enfants
      })
      .catch(error => {
        console.error("Il y a eu une erreur !", error);
      });
  }, []);

  // Pas besoin de vérifier `!children` ici car `children` est initialisé comme un tableau vide et donc toujours truthy
  return (
    <ul className="listChildren">
      {children.map((child, index) => (
        <li key={index} >
            <ChildrenCard children={child} />
        </li>
      ))}
    </ul>
  );
}

export default ListChildren;
