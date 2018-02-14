import {Component, EventEmitter} from '@angular/core';
import {LoadService} from "./services/loadService";
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private loadService: LoadService, private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'nl']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}



