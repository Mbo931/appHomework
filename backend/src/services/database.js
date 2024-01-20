import mongoose from 'mongoose';
import dbConfig from '../config/dbConfig.js';

const database = () => {
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
  mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, mongooseOptions)  
    .then(() => console.log('Connecté à la base de données MongoDB'))
    .catch((err) => console.error('Erreur de connexion à la base de données :', err));
};

export  {database};
