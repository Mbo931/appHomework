import { Link } from "react-router-dom";

function ListChildren({children}) {
    if (!children) {
    return <div>Chargement...</div>; // Ou tout autre message ou élément de chargement
  }
    return ( 
        <ul>
      {children.map((child, index) => (
        <li key={index}>
          <Link to={`/children/${child.id}`}>
            {child.firstName} {child.lastName} - Groupe: {child.groupe}
          </Link>
        </li>
      ))}
    </ul>
     );
}

export default ListChildren;