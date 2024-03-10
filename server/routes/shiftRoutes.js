import express from 'express'
const router = express.Router();
import { addShift, deactivateShift, getShift, getShifts, modifyShift } from '../controllers/shiftController.js';


router.get('/getshifts', getShifts);
router.get('/getshift/:shiftId', getShift);
router.post('/add', addShift);
router.put('/modify/:shiftId', modifyShift);
router.delete('/deactivate/:shiftId', deactivateShift);

export default router;