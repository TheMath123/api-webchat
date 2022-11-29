import express from 'express';
const router = express.Router();

import HomeController from '../controllers/HomeController';

router.get('/api/egg', HomeController.index);

export { router };
