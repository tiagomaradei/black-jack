import { Router } from 'express';
import CardsController from '../controllers/CardsController';

const cardsController = new CardsController();
const router = Router();

router.use('/cards', router);
router.get('/', cardsController.list);
router.get('/:cardId/', cardsController.show);

export default router;
