import express from 'express';
import { createSession, addChildToSession, listChildrenInSession, updateSessionStatus, deleteSession } from '../controllers/sessionController';

const router = express.Router();

router.post(
    '/',
    createSession
);

router.patch(
    '/:sessionId/status',
    updateSessionStatus
);
router.patch(
    '/sessions/:sessionId/children',
     addChildToSession
);

router.get(
    '/',
    listChildrenInSession
);

router.delete(
    '/:sessionId',
     deleteSession
);