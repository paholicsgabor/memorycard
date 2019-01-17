import { Injectable } from '@angular/core';
import { Card, Cardstate } from './card';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  cards: Array<Card>;

  constructor() {
    this.cards = [
      { no: 0, state: Cardstate.Open },
      { no: 1, state: Cardstate.Closed },
      { no: 2, state: Cardstate.Ready },
      { no: 0, state: Cardstate.Open },
      { no: 1, state: Cardstate.Closed },
      { no: 2, state: Cardstate.Ready }
    ];
  }
}
