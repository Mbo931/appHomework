import { useState } from "react";
import AuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";

function FormSignin() {
  const navigate = useNavigate(); // Correction ici : utilisez useNavigate comme une fonction
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // Ajoutez l'état loading
  const [message, setMessage] = useState(""); // Ajoutez l'état message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { username, password } = formData; // Extrait les valeurs de formData

    setLoading(true); // Définir le chargement sur true lors de l'envoi du formulaire
    AuthService.login(username, password).then(
      () => {
        navigate("/profile"); // Naviguez vers le profil après la connexion réussie
        window.location.reload()
        setLoading(false); // Définir le chargement sur false après la navigation
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false); // Définir le chargement sur false en cas d'erreur
        setMessage(resMessage); // Afficher le message d'erreur
      }
    );
  };

  const formFields = [
    { name: 'username', label: 'Nom d\'utilisateur', type: 'text' },
    { name: 'password', label: 'Mot de passe', type: 'password' },
  ];

  return (
    <>
      <h2>Connexion</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleSubmit}>
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
        
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Connexion"}
        </button>
      </form>
    </>
  );
}

export default FormSignin;
