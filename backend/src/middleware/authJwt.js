import { Jwt } from "jsonwebtoken";
import authConfig from "../config/authConfig.js";
import db from "../models/index.js";
const User = db.user;
const Role = db.role;

const verifyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({ message: "No token provided!" });
    }
    
    jwt.verify(
        token,
        authConfig.secret,
        (err,decoded)=>{
            if(err){
                return res.status(401).send({
                  message: "Unauthorized!",
                })
            }
            req.userId = decoded.id;
              next();
        }
    )
}

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    Role.find(
      { _id: { $in: user.roles } }, // Utiliser user au lieu de users
      (err, roles) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        let isAdmin = false; // Ajouter une variable pour suivre si l'utilisateur est administrateur
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            isAdmin = true; // Mettre à jour la variable isAdmin
            break; // Sortir de la boucle dès qu'on trouve un rôle admin
          }
        }
        if (isAdmin) {
          return next(); // Appeler next() seulement si l'utilisateur est admin
        } else {
          return res.status(403).send({ message: "Il faut être Admin" });
        }
      }
    );
  });
};

const isRefer = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    Role.find(
      { _id: { $in: user.roles } }, 
      (err, roles) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        let isRefer = false; 
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "refer") {
            isRefer = true; 
            break; 
          }
        }
        if (isRefer) {
          return next(); 
        } else {
          return res.status(403).send({ message: "Il faut être Réferent" });
        }
      }
    );
  });
};

const authJwt ={
    verifyToken,
    isAdmin,
    isRefer
};

export  {authJwt};