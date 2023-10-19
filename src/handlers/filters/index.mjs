import { Router } from 'express';
import multer from 'multer';
import applyFiltersHandler from './applyFiltersHandler.mjs';

const router = Router();

// Parte del multer con POST
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
  res.send('OK images GET');
});

router.post('/', upload.array('images[]'), applyFiltersHandler);

export const test = () => {

};

export default router;
