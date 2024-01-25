import { useState } from "react";

function FormSignin() {
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
    // Ajoutez votre logique de soumission du formulaire ici
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
