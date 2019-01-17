import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { GameService } from '../game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  cards$: Observable<Card[]>;

  constructor(private game: GameService) { }

  ngOnInit() {
    this.cards$ = this.game.cards$;
  }

}
