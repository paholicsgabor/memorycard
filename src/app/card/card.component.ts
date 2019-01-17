import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { Card, Cardstate } from '../card';
import { GameService } from '../game.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() i: number;

  constructor(private game: GameService) { }

  ngOnInit() {
  }

  get class() {
    return this.card.state === Cardstate.Ready ? 'card mb-3 bg-dark' : 'card mb-3';
  }

  get src() {
    const visibleImg = environment.cardimgs[this.card.no % environment.cardimgs.length];
    const blankImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    return this.card.state === Cardstate.Closed ? blankImg : visibleImg;
  }

  onClick() {
    if (this.card.state === Cardstate.Closed) {  this.game.cardClick(this.i); }
  }
}
