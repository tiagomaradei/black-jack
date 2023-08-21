import { Request, Response } from 'express';
import Card from '../../../core/entities/Card';
import Deck from '../../../core/entities/Deck';

type CardsType = Card & { id: string };
const cards: CardsType[] = [];

export default class CardsController {
  public async list(_request: Request, response: Response): Promise<Response> {
    const deck = new Deck().generateDeck();

    const deckCards = deck.map((item) => {
      const cardItem = { ...item, id: Math.random().toString() };
      cards.push(cardItem);
      return cardItem;
    });

    return response.json({ cards: deckCards });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const cardId = request.params.cardId;
    const card = cards.find((item) => item.id === cardId);

    if (card) return response.json(card);
    return response.status(404).json({ message: 'Card not found.' });
  }
}
