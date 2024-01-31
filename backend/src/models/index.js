import mongoose from "mongoose";
import User from './User.js'
import Role from './Role.js';

mongoose.Promise = global.Promise;

const db = [];

db.mongoose = mongoose;

db.user = User.default;
db.role = Role.default;

db.ROLES = ["anim", "admin", "refer"];

export default db;
