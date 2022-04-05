import express from 'express';

import {
	listFiles,
} from '@controllers/filesController';

const router = express.Router();

router.get('/files', [], listFiles);

export default router;
