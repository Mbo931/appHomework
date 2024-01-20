import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// Utilisez des chemins relatifs pour les modules user et role
import * as UserModule from './User.js';
import * as RoleModule from './Role.js';

db.user = UserModule.default;
db.role = RoleModule.default;

db.ROLES = ["anim", "admin", "refer"];

export default db;
