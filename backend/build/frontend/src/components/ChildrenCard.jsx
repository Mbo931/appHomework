import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function ChildrenCard({children}) {
    
    return ( 
        <div className="childrenCard">
            <h3>
                {children.firstName} {children.lastName}
            </h3>
            <span>{children.groupe}</span>
            
            <NavLink to={`/${children._id}`}>Voir plus ...</NavLink>

            <button>Présent </button>
            
        </div>
     );
}

export default ChildrenCard;