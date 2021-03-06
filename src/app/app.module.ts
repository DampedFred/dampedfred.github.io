import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {MaterializeModule} from 'angular2-materialize';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import {RouterModule} from "@angular/router";
import {LoadService} from "./services/loadService";
import { CardComponent } from './components/card/card.component';
import {FileSelectDirective} from "ng2-file-upload";
import { CardCollectionComponent } from './components/card-collection/card-collection.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import {PapaParseModule} from 'ngx-papaparse';
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';
//bij cannot find name gewoon pakket verwijderen. In het begin na verwijderen van node modules altijd npm install angular2-materialize doen

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CardComponent,
    FileSelectDirective,
    CardCollectionComponent,
    SearchbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    PapaParseModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '../assets/i18n', '.json'),
      deps: [Http]
    }),
    RouterModule.forRoot([
      {path: 'home', component: MainComponent},
    ]),
  ],
  providers: [LoadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
