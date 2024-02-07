import jwt from "jsonwebtoken";
import authConfig from "../config/authConfig.js";
import db from "../models/index.js";
const User = db.user;
const Role = db.role;
  
const verifyToken = (req,res,next)=>{
    let token = req.headers.authorization;
    //console.log(req.headers.authorization);
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
    if (!user) { 
      return res.status(404).send({ message: "Utilisateur non trouvé." });
    }
    Role.find(
      { _id: { $in: user.roles } },
      (err, roles) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        const isAdmin = roles.some(role => role.name === "admin"); // Utilisation de 'some' pour simplifier
        if (isAdmin) {
          return next();
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
    if (!user) { // Vérifiez si l'utilisateur existe
      return res.status(404).send({ message: "Utilisateur non trouvé." });
    }
    Role.find(
      { _id: { $in: user.roles } },
      (err, roles) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        const isRefer = roles.some(role => role.name === "refer"); // Utilisation de 'some' pour simplifier
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