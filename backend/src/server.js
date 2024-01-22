import express from 'express';
import dotenv from 'dotenv';
import { database } from './services/database.js';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js'
import path from 'path'; 
import Role from './models/Role.js'; 


const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;


database();

const app = express();
/////////////////////////
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
////////////////////

function initial() {
  Role.countDocuments((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
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
initial()

/////////////////////////////////
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.use('/api/role', userRouter);
app.use('/api/auth', authRouter);

///////////////////////////////
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
