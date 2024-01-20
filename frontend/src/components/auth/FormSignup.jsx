function FormSignup() {
const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    // Ajoutez d'autres champs selon vos besoins
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez votre logique de soumission du formulaire ici
    console.log('Formulaire soumis avec les données :', formData);
  };

  const formFields = [
    { name: 'username', label: 'Nom d\'utilisateur', type: 'text' },
    { name: 'password', label: 'Mot de passe', type: 'password' },
    { name: 'confirmPassword', label: 'Confirmer le mot de passe', type: 'password' },
  ];

  return (
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
  );
}

export default FormSignup;