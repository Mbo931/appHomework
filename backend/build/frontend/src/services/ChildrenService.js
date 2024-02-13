import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000/api/children/",
  headers: {
    "Content-type": "application/json"
  }
});

const API_URL = api.defaults.baseURL; // Utilisez l'URL de base de l'instance axios


    const postAddChildren=(data)=> { // Assurez-vous de passer les données nécessaires en paramètre
        return api.post('addChildren', data);
    }
    const getFindAllChildren=()=> {
        return api.get('');
    }
    const getFindOneChildren=(id)=> { // Prend l'ID en paramètre
        return api.get(`${id}`); // Utilisez des littéraux de gabarit pour insérer l'ID
    }
    const putUpdateChildren=(id, data)=> { // Prend l'ID et les données à mettre à jour en paramètres
        return api.put(`${id}`, data); // Utilisez des littéraux de gabarit pour insérer l'ID
    }
    const deleteChildren=(id)=> { // Prend l'ID en paramètre
        return api.delete(`${id}`); // Utilisez des littéraux de gabarit pour insérer l'ID
    }
    const postAddComment=(id, commentData)=> { // Prend l'ID et les données du commentaire en paramètres
        return api.post(`${id}/comments`, commentData); // Utilisez des littéraux de gabarit pour insérer l'ID
    }
    
const ChildrenService ={
    postAddChildren,
    getFindAllChildren,
    getFindOneChildren,
    putUpdateChildren,
    deleteChildren,
    postAddComment


}

export default ChildrenService;
