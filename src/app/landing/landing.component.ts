import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  decksizes = [6, 8, 10, 12, 14, 16, 18, 20];
  selectedsize = 12;
  constructor(private game: GameService,
    private router: Router) { }

  ngOnInit() {
    if (this.game.loaded) { this.navigateToGame(); }
  }

  navigateToGame() {
    this.router.navigateByUrl('/game');
  }

  New() {
    this.game.initGame(this.selectedsize);
    this.navigateToGame();
  }

}
