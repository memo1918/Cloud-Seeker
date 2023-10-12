import {Component} from '@angular/core';
import {APIService} from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(public api: APIService) {
    this.api.loadCounter();
  }
}
