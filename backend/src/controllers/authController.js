import authConfig from "../config/authConfig.js";
import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const User = db.user;
const Role = db.role;

  const signUp = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
      });

      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.send({ message: "Utilisateur créé" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.status(201).json({ message: 'Utilisateur créé !' });
          });
        });
      }
    })
    .catch(error => res.status(400).json({ error }));
};



  const signIn = (req, res) => {
  User.findOne({ username: req.body.username })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (!user) {
        return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe incorrecte!"
        });
      }

      const token = jwt.sign(
        { userId: user._id }, 
        authConfig.secret, 
        { expiresIn: '24h' });

      // Récupération des rôles sous forme d'autorités
      const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);

      // Réponse avec les informations de l'utilisateur et le token
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

const authControllers={
    signIn,
    signUp
};

export {authControllers};