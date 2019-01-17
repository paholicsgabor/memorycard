import { Component } from '@angular/core';
import { Cardstate } from './card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'supercharge';

  cards = [
    { no: 0, state: Cardstate.Open },
    { no: 1, state: Cardstate.Closed },
    { no: 2, state: Cardstate.Ready },
    { no: 0, state: Cardstate.Open },
    { no: 1, state: Cardstate.Closed },
    { no: 2, state: Cardstate.Ready }
  ];


}
