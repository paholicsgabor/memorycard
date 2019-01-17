import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cardstate } from '../cardstate.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() no: number;
  @Input() state: Cardstate;

  @Output() cardClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get src() {
    const visibleImg = environment.cardimgs[this.no % environment.cardimgs.length];
    const blankImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    return this.state === Cardstate.Closed ? blankImg : visibleImg;
  }

  onClick() {
    if (this.state === Cardstate.Closed) { this.cardClick.emit(this.no); }
  }
}
