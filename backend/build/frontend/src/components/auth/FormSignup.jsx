import { useState } from "react";

function FormSignup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role:'anim',
      
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
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Mot de passe', type: 'password' },
    { name: 'confirmPassword', label: 'Confirmer le mot de passe', type: 'password' },
  ];

  return (
    <>
      <h2>Création d'utilisateur</h2>
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
