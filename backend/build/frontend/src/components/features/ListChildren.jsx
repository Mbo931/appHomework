import { useState, useEffect } from "react";
import ChildrenService from "../../services/ChildrenService";
import ChildrenCard from "../ChildrenCard";

function ListChildren() {
  const [children, setChildren] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
  ChildrenService.getFindAllChildren()
    .then(response => {
      setChildren(response.data);
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des enfants :", error);
    });
}, []); 
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredChildren = children.filter(child => {
    return child.groupe.includes(filter); // Adaptez cette ligne en fonction de votre structure de données
  });

  
  return (
    <div>
      <h2>Liste des Enfants</h2>
    <div className="filter">
      <select value={filter} onChange={handleFilterChange}>
        <option value="">Tous les groupes</option>
        <option value="Petit">Petit</option>
        <option value="Grand">Grand</option>
        <option value="Collège">Collège</option>
        
      </select>
    </div>

    <ul className="listChildren">
      {filteredChildren.map((child, index) => (
        <li key={index}>
          <ChildrenCard children={child} />
        </li>
      ))}
    </ul>
  </div>
  );
}

export default ListChildren;
