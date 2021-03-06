import {Component, EventEmitter} from '@angular/core';
import {LoadService} from "./services/loadService";
import {TranslateService} from 'ng2-translate';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chosenLanguage: string ='';

  constructor(private loadService: LoadService, private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'nl']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.chosenLanguage = 'EN';
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    this.chosenLanguage = lang.toUpperCase();
  }
}



