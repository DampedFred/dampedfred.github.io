import {Component, OnInit, Input} from '@angular/core';
import {Load} from "../../model/Load";
import {LoadService} from "../../services/loadService";

@Component({
  selector: 'card-collection',
  templateUrl: 'card-collection.component.html',
  styleUrls: ['card-collection.component.css']
})
export class CardCollectionComponent implements OnInit {
  @Input() loads: Load[]=[];

  constructor(private loadService: LoadService) { }

  ngOnInit() {
  }

}
