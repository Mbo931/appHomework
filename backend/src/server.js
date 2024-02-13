import express from 'express';
import dotenv from 'dotenv';
import { database } from './services/database.js';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import childrenRouter from './routes/childrenRoutes.js'

import path from 'path';
import { fileURLToPath } from 'url';
import {dirname} from 'path'; 
import Role from './models/Role.js'; 
import 'esm';



database();

const app = express();

//app.use(cors())
/////////////////////////

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader("Content-Type", "text/javascript");
  
  next();
});

  




// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
////////////////////

function initialRole() {
  Role.countDocuments((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "anim"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'anim' to roles collection");
      });

      new Role({
        name: "refer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'refer' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

initialRole()

async function addRandomPersonnesAPrevenir  ()  {
  const allChildren = await Children.find(); // Récupère tous les documents Children

  const promises = allChildren.map(async (child) => {
    const randomPerson = {
      firstName: `FirstName${Math.floor(Math.random() * 100)}`, // Génère un prénom aléatoire
      lastName: `LastName${Math.floor(Math.random() * 100)}`, // Génère un nom de famille aléatoire
      relation: 'Parent', // Vous pouvez également générer cela aléatoirement
      phoneNumber: `+12345678${Math.floor(Math.random() * 100)}`, // Génère un numéro de téléphone aléatoire
    };

    return Children.updateOne({ _id: child._id }, { $push: { personnesAPrevenir: randomPerson } });
  });

  await Promise.all(promises);
  console.log('Toutes les personnes à prévenir ont été ajoutées.');
};

addRandomPersonnesAPrevenir();

/////////////////////////////////

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//app.use(express.static(path.join(__dirname, '../frontend/build')));

//app.get('/*', (req, res) => {
//  res.sendFile(path.join(__dirname, '../build/frontend/index.html'));
//});


app.use('/api/role', userRouter);

app.use('/api/auth', authRouter);

app.use('/api/children', childrenRouter);

///////////////////////////////
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
