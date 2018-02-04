import {Component, OnInit, Input} from '@angular/core';
import {Load} from "../../model/Load";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {
  @Input() load: any;


  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  getFontSizeForDescription (description : string){
    const style = `75%`;
    if (description.length >= 21){
      return this.sanitizer.bypassSecurityTrustStyle(style);
    }
  }

}
