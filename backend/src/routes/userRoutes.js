import express  from 'express';
import { authJwt } from '../middleware/authJwt.js';
import { userControllers } from '../controllers/usersControllers.js';


 const router = express.Router();

router.get(
    "/all",
    userControllers.allAccess
);
router.get(
    "/anim",
    [authJwt.verifyToken],
    userControllers.userBoard
);
router.get(
    "/refer",
    [
        authJwt.verifyToken,
        authJwt.isRefer
    ],
    userControllers.referBoard
)
router.get(
    "/admin",
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
    userControllers.adminBoard
)

export default router;  
