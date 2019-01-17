import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Card, Cardstate } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;

  @Output() cardClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get class() {
    return this.card.state === Cardstate.Ready ? 'card bg-dark' : 'card';
  }

  get src() {
    const visibleImg = environment.cardimgs[this.card.no % environment.cardimgs.length];
    const blankImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    return this.card.state === Cardstate.Closed ? blankImg : visibleImg;
  }

  onClick() {
    if (this.card.state === Cardstate.Closed) { this.cardClick.emit(this.card.no); }
  }
}
