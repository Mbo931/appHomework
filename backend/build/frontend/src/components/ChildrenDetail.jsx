import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ChildrenService from "../services/ChildrenService";

function ChildrenDetail() {
  const [children, setChildren] = useState([]);
  const { childrenId } = useParams();

  useEffect(() => {
    if (childrenId) {
      ChildrenService.getFindOneChildren(childrenId)
        .then(response => {
          setChildren(response.data);
           console.log('check')
        })
        .catch(error => {
          console.error("Erreur lors de la récupération de l'enfant:", error);
        });
    }
  }, [childrenId]);

  return (
    <div className="infoChildren">
        <NavLink to={`/home`}>Retour⏪</NavLink>
      <h3>{children.firstName}</h3>
      <h3>{children.lastName}</h3>
      <span>{children.niveauScolaire}</span> <span>{children.groupe}</span>
      <h4>Personne à prévenir en cas d'urgence</h4>
      <ul>
        {children.personnesAPrevenir && children.personnesAPrevenir.map((personne, index) => (
          <li key={index}>
            <p>{personne.firstName} {personne.lastName} <span>({personne.relation})</span></p>
            <p>{personne.phoneNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChildrenDetail;