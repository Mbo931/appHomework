import db from "../models/index.js";

const ROLES = db.ROLES;
const User = db.User;

const checkDuplicateUsernameOrEmail = (req,res,next )=>{
    //Username
    User.findOne({
        username: req.body.username
    }).exec((err,user)=>{
        if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Le nom d’utilisateur est déjà utilisé" });
      return;
    }
    })

    //Email
    User.findOne({
        email: req.body.email
    }).exec((err,email)=>{
        if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Email est déjà utilisé !" });
        return;
      }
    })
    next();
}

const checkRoles= (req,res,next)=>{
    if(req.body.roles){
        for(let i =0; i<req.body.roles.lenght; i++ ){
            if (!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
            }
        }
    }
    next();
}

export const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRoles
};

 