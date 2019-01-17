import { Injectable } from '@angular/core';
import { Card, Cardstate } from './card';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _cards$ = new ReplaySubject<Array<Card>>(1);
  private cards: Array<Card>;


  get cards$(): Observable<Array<Card>> {
    return this._cards$;
  }

  constructor() {
    this.cards = [
      { no: 0, state: Cardstate.Open },
      { no: 1, state: Cardstate.Closed },
      { no: 2, state: Cardstate.Ready },
      { no: 0, state: Cardstate.Open },
      { no: 1, state: Cardstate.Closed },
      { no: 2, state: Cardstate.Ready }
    ];
    this._cards$.next(this.cards);

  }

  private getOpenIndex(): Array<number> {
    const result = [];
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].state === Cardstate.Open) { result.push(i); }
    }
    return result;
  }

  private checkEqual(i: number, j: number): boolean {
    if (this.cards[i].no === this.cards[j].no) {
      return true;
    } else {
      return false;
    }
  }

  cardClick(i: number) {

    const open = this.getOpenIndex();

    switch (open.length) {
      case 0:
        this.cards[i].state = Cardstate.Open;
        break;
      case 1:
        if (this.checkEqual(i, open[0])) {
          this.cards[i].state = Cardstate.Ready;
          this.cards[open[0]].state = Cardstate.Ready;
        } else {
          this.cards[i].state = Cardstate.Open;
        }
        break;
      case 2:
        this.cards[i].state = Cardstate.Open;
        this.cards[open[0]].state = Cardstate.Closed;
        this.cards[open[1]].state = Cardstate.Closed;
        break;
    }
    this._cards$.next(this.cards);

  }
}
