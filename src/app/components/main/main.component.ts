import {Component, OnInit, Input} from '@angular/core';
import {LoadService} from "../../services/loadService";
import {Load} from "../../model/Load";

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})
export class MainComponent implements OnInit {
  listOfLoads: Load[] = this.loadService.listOfLoads;

  constructor(private loadService: LoadService) {
  }

  ngOnInit() {
    this.loadService.loadsChanged.subscribe((value) => {
      this.listOfLoads = value;
    });

    console.log(this.listOfLoads);
  }

}
