import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  size = [6, 8, 10, 12, 14, 16, 18, 20];
  selectedValue = 12;
  constructor(private game: GameService,
    private router: Router) { }

  ngOnInit() {
  }

  newGame() {
    this.game.initGame(this.selectedValue);
    this.router.navigateByUrl('/game');
  }

}
