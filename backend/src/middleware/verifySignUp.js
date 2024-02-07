import db from "../models/index.js";


const ROLES = db.ROLES;
const User = db.user;


const checkDuplicateUsernameOrEmail = (req, res, next) => {
    console.log('checkDuplicateUsernameOrEmail')
    // Vérification du nom d'utilisateur
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Le nom d’utilisateur est déjà utilisé." });
            return;
        }

        // Vérification de l'email
        User.findOne({
            email: req.body.email
        }).exec((err, email) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (email) {
                res.status(400).send({ message: "L'email est déjà utilisé !" });
                return;
            }
            next(); // Appeler next ici assure que next() est appelé après les vérifications
        });
    });
};

const checkRoles = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) { // Correction de la faute de frappe ici
            if (!db.ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Échec ! Le rôle ${req.body.roles[i]} n'existe pas !`
                });
                return;
            }
        }
    }
    next();
};

export const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRoles
};
