import express from 'express';
import { verifySignUp } from '../middleware/verifySignUp.js';
import { authControllers } from '../controllers/authController.js';

 
const router = express.Router();
router.post(
    "/signUp",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRoles
    ],
    authControllers.signUp
);

router.post(
    "/signIn",
    authControllers.signIn
);

export default router;  