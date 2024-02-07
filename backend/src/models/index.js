import mongoose from "mongoose";
import User from './User.js'
import Role from './Role.js';
import Children from "./Children.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;

db.children= Children;

db.ROLES = ["anim", "admin", "refer"];

export default db;
