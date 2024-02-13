import Session from "../models/Session";



export const createSession = async (req, res) => {
  try {
    const newSession = new Session(req.body); // Supposons que req.body contient toutes les infos nécessaires
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de la session", error });
  }
};

export const addChildToSession = async (req, res) => {
  const { sessionId, childId } = req.params;
  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session non trouvée" });
    }
    session.childrenPresent.push(childId); // Ajouter l'ID de l'enfant à la liste
    await session.save();
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'ajout de l'enfant à la session", error });
  }
};

export const listChildrenInSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await Session.findById(sessionId).populate('childrenPresent');
    if (!session) {
      return res.status(404).json({ message: "Session non trouvée" });
    }
    res.status(200).json(session.childrenPresent);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la récupération des enfants", error });
  }
};

export const deleteSession = async (req, res)=>{
    const {id} = req.params;
    try{
        const deleteSession = await Session.findById(id);
        if (!deleteSession) res.status(404).send({ message: "Session non trouvé." });
        else res.status(200).send({ message: "Session supprimé." });
    } catch(error){
            res.status(500).send({ message: "Erreur lors de la suppression de la session", error });

    }
}

export const updateSessionStatus = async (req, res) => {
  const { sessionId } = req.params;
  const { status } = req.body;

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).send({ message: "Session non trouvée" });
    }

    session.status = status;
    await session.save();
    res.status(200).json(session);
  } catch (error) {
    res.status(500).send({ message: "Erreur lors de la mise à jour du statut de la session", error });
  }
};

