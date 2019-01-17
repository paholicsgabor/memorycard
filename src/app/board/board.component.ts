import { Component, OnInit } from '@angular/core';
import { Gamestate } from '../gamestate';
import { GameService } from '../game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  state$: Observable<Gamestate>;

  constructor(private game: GameService) { }

  ngOnInit() {
    this.state$ = this.game.state$;
  }

  Restart() {
    this.game.restartGame();
  }

}
