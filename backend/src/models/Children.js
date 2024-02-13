import mongoose from "mongoose";

const Children = mongoose.model(
    "Children",
    new mongoose.Schema({
        firstName:String,
        lastName:String,
        niveauScolaire:String,
        groupe:String,
        commentaires: [
    {
      texte: String,
      date: { type: Date, default: Date.now },
      auteur: String,
    },
  ],
  personnesAPrevenir: [
    {
      firstName:String,
      lastName:String,
      relation: String, 
      phoneNumber: String,
    },
  ],
    })
)

export default Children;