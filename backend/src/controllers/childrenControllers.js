
import Children from "../models/Children.js";



export const create = async (req, res) => {
    if (!req.body.firstName && !req.body.lastName) {
        return res.status(400).send({ message: "Contenu vide" });
    }

    try {
        const children = new Children({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            niveauScolaire: req.body.niveauScolaire,
            groupe: req.body.groupe,
            personnesAPrevenir: req.body.personnesAPrevenir, // Assurez-vous que c'est un tableau
        });

        const savedChildren = await children.save();
        res.send(savedChildren);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la création de l'enfant."
        });
    }
};

export const  findAll= async (req,res)=>{
   try {
    const children = await Children.find();
    res.status(200).json(children);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des enfants", error: error });
  }
}
export const findOne =async (req, res) => {
  const id  = req.params.id; // Ou tout autre critère de recherche dans req.query ou req.body
  try {
    const child = await Children.findById({ _id: id }); // Utilisez le critère de recherche approprié
    if (!child) {
      return res.status(404).send({ message: "Enfant non trouvé." });
    }
    res.status(200).json(child);
  } catch (error) {
    res.status(500).send({ message: "Erreur lors de la recherche de l'enfant", error });
  }
};
export const update=async (req, res) => {
  const { id } = req.params.id;
  const updateData = req.body;

  try {
    const updatedChild = await Children.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedChild) {
      return res.status(404).send({ message: "Enfant non trouvé." });
    }
    res.status(200).json(updatedChild);
  } catch (error) {
    res.status(500).send({ message: "Erreur lors de la mise à jour de l'enfant", error });
  }
};
export const deleteOne=async (req, res) => {
  const { id } = req.params;
  try {
    const deletedChild = await Children.findByIdAndRemove(id);
    if (!deletedChild) res.status(404).send({ message: "Enfant non trouvé." });
    else res.status(200).send({ message: "Enfant supprimé." });
  } catch (error) {
    res.status(500).send({ message: "Erreur lors de la suppression de l'enfant", error });
  }
};


export const  addComment = async(req, res)=> {
  const { childId, texte, auteur } = req.body; // Assurez-vous que ces données sont envoyées dans la requête
  try {
    const child = await Children.findById(childId);
    if (!child) return res.status(404).send({ message: "Enfant non trouvé" });

    // Ajouter le nouveau commentaire
    child.commentaires.push({ texte, auteur, date: new Date() });
    await child.save();
    res.status(200).send(child);
  } catch (error) {
    res.status(500).send({ message: "Erreur lors de l'ajout du commentaire" });
  }
}
