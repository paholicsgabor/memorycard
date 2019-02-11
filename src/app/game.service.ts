import { Injectable } from '@angular/core';
import { Card, Cardstate } from './card';
import { Gamestate } from './gamestate';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _state$ = new ReplaySubject<Gamestate>(1);
  private state: Gamestate;

  get loaded(): boolean {
    return this.state ? true : false;
  }

  get state$(): Observable<Gamestate> {
    return this._state$;
  }

  constructor() {
    const saved = localStorage.getItem('state');
    if (saved) {
      this.state = JSON.parse(saved);
      this._state$.next(this.state);
    }

  }

  private getOpenIndex(): Array<number> {
    const result = [];
    for (let i = 0; i < this.state.cards.length; i++) {
      if (this.state.cards[i].state === Cardstate.Open) { result.push(i); }
    }
    return result;
  }

  private checkEqual(i: number, j: number): boolean {
    if (this.state.cards[i].no === this.state.cards[j].no) {
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

  restartGame() {
    const n = this.state.cards.length;
    this.initGame(n);
  }

  initGame(n: number) {
    const numbers = [];
    for (let i = 0; i < n / 2; i++) {
      numbers.push(i);
      numbers.push(i);
    }
    this.shuffleArray(numbers);
    console.log(numbers);
    this.state = this.state ? { cards: [], tries: 0, best: this.state.best } : { cards: [], tries: 0, best: 0 };
    for (let i = 0; i < n; i++) {
      this.state.cards.push({ no: numbers[i], state: Cardstate.Closed });
    }
    this._state$.next(this.state);
  }

  private checkEnd() {
    for (let i = 0; i < this.state.cards.length; i++) {
      if (this.state.cards[i].state !== Cardstate.Ready) { return; }
    }
    if (this.state.tries < this.state.best) { this.state.best = this.state.tries; }

  }

  cardClick(i: number) {

    const open = this.getOpenIndex();

    switch (open.length) {
      case 0:
        this.state.cards[i].state = Cardstate.Open;
        break;
      case 1:
        this.state.tries++;
        if (this.checkEqual(i, open[0])) {
          this.state.cards[i].state = Cardstate.Ready;
          this.state.cards[open[0]].state = Cardstate.Ready;
          this.checkEnd();
        } else {
          this.state.cards[i].state = Cardstate.Open;
        }
        break;
      case 2:
        this.state.cards[i].state = Cardstate.Open;
        this.state.cards[open[0]].state = Cardstate.Closed;
        this.state.cards[open[1]].state = Cardstate.Closed;
        break;
    }
    this._state$.next(this.state);
    localStorage.setItem('state', JSON.stringify(this.state));
  }
}
