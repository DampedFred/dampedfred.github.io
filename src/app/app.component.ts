import {Component, EventEmitter} from '@angular/core';
import {LoadService} from "./services/loadService";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private loadService: LoadService) {
  }

}

