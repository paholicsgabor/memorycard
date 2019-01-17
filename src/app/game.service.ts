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
    this.initGame(10);

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

  private shuffleArray(array: Array<number>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  initGame(n: number) {
    const numbers = [];
    for (let i = 0; i < n / 2; i++) {
      numbers.push(i);
      numbers.push(i);
    }
    this.shuffleArray(numbers);
    console.log(numbers);
    this.cards = [];
    for (let i = 0; i < n; i++) {
      this.cards.push({ no: numbers[i], state: Cardstate.Closed });
    }
    this._cards$.next(this.cards);
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
