import { useState } from "react";
import AuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";

function FormSignin() {
  const navigate =useNavigate
  const [formData, setFormData] = useState({
    username: '',
    password: '',
      
  });

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
    

    
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
    
  };

  const formFields = [
    { name: 'username', label: 'Nom d\'utilisateur', type: 'text' },
    { name: 'password', label: 'Mot de passe', type: 'password' },
  ];



  return (
    <>
      <h2>Connexion</h2>
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
        
        <button type="submit">S'inscrire</button>
      </form>
    </>
  );
}

export default FormSignin;
