import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['En attente', 'Vérifié'], 
    default: 'En attente'
  },
  childrenPresent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Children'
    }
  ],
  // Autres champs au besoin
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
