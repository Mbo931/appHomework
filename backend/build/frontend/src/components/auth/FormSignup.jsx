import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";

function FormSignup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role:'anim',
      
  });

  const [message, setMessage] = useState(""); // Ajoutez cet état pour gérer les messages
  const [successful, setSuccessful] = useState(false); // Ajoutez cet état pour gérer l'état de réussite
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      setFormData((prevData) => ({
        ...prevData,
        role: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Formulaire soumis avec les données :', formData);
  

  // Extraction des valeurs depuis formData
  const { username, email, password } = formData;

  AuthService.register(username, email, password).then(
    (response) => {
      setMessage(response.data.message); 
      setSuccessful(true);
      window.location.reload() 
      console.log('Données envoyées');
      navigate("/profile"); 
      console.log('Formulaire soumis avec les données :', formData);

    },
    (error) => {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString();
      setMessage(resMessage); // Mettre à jour le message d'erreur
      console.error(resMessage); // Afficher l'erreur dans la console
    }
  );
};


  const formFields = [
    { name: 'username', label: 'Nom d\'utilisateur', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Mot de passe', type: 'password' },
    { name: 'confirmPassword', label: 'Confirmer le mot de passe', type: 'password' },
  ];

  return (
    <>
      <h2>Création d'utilisateur</h2>
      <form onSubmit={handleSubmit} method="POST">
        {formFields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <fieldset>
          <legend>Rôle: </legend>
          <div>
            <input
              type="radio"
              id="anim"
              name="role"
              value="anim"
              checked={formData.role === 'anim'}
              onChange={handleChange}
            />
            <label htmlFor="anim">Animateur</label>
          </div>

          <div>
            <input
              type="radio"
              id="ref"
              name="role"
              value="ref"
              checked={formData.role === 'ref'}
              onChange={handleChange}
            />
            <label htmlFor="ref">Référent</label>
          </div>

          <div>
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              checked={formData.role === 'admin'}
              onChange={handleChange}
            />
            <label htmlFor="admin">Admin</label>
          </div>
        </fieldset>
        <button type="submit">S'inscrire</button>
      </form>
    </>
  );
}

export default FormSignup;
