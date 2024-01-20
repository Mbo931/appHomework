const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200).send("Anim Content.");
};

const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

const referBoard = (req, res) => {
  res.status(200).send("Refer Content.");
}; 

const userControllers={
    allAccess,
    userBoard,
    adminBoard,
    referBoard
};

export {userControllers};