import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// Utilisez des chemins relatifs pour les modules user et role
db.user = require('./User.js');
db.role = require('/Role.js');

db.ROLES = ["anim", "admin", "refer"];

export default db;
