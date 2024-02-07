import { NavLink } from "react-router-dom";

function ChildrenDetail({ children }) {
  // Vérifiez si 'children' est défini avant d'essayer d'accéder à ses propriétés
  

  return (
    <div className="infoChildren">
        <NavLink to={`/`}>Retour⏪</NavLink>
      <h3>{children.firstName}</h3>
      <h3>{children.lastName}</h3>
      <span>{children.niveauScolaire}</span> <span>Groupe</span>
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