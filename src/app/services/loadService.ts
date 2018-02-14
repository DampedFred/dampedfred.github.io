import {Load} from "../model/Load";
import {deserialize} from "serializer.ts/Serializer";
import {Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import { PapaParseService } from 'ngx-papaparse';

/**
 * Created by Frederic on 27-6-2017.
 */

@Injectable()
export class LoadService {
  papa: any;
  listOfLoads: Load[] = [];
  loadsChanged: Subject<Load[]> = new Subject<Load[]>();
  pictureFiles: File[] = [];
  image: any;

  constructor(private papaConstructor: PapaParseService) {
    this.papa = papaConstructor;
  }

  getLoads(): Load[] {
    return this.listOfLoads;
  }

  setPictureLocation(pictureFiles: File[], loads: Load[], elementPicture: number, elementLoads: number) {
    let reader = new FileReader();
    reader.readAsDataURL(pictureFiles[elementPicture]);
    reader.onload = (e: any) => {
      loads[elementLoads].pictureLocation = e.target.result;
    }
  }

  //dubbele code voor check
  importPictures(loads: Load[], pictureInputs: any) {
    this.pictureFiles = pictureInputs.target.files;

    for (let i = 0; i < loads.length; i++) {
      for (let j = 0; j < this.pictureFiles.length; j++) {
        if (loads[i].batch.indexOf("/") !== -1 || loads[i].batch.indexOf(">") !== -1) {
          if (this.pictureFiles[j].name.split(".")[0].toUpperCase() === loads[i].batch.replace(/[/>]/g, "_").toUpperCase()) {
            this.setPictureLocation(this.pictureFiles, loads, j, i);
          }
        }
        else if (this.pictureFiles[j].name.split(".")[0].toUpperCase() === loads[i].batch.toUpperCase()) {
          this.setPictureLocation(this.pictureFiles, loads, j, i);
        }
      }
    }
  }

  importFile(fileInput: any) {
    let listOfLoads: Load[] = [];
    let file = fileInput.target.files[0];

    Observable.create(
      observable => {
        this.papa.parse(file, {
          beforeFirstChunk: function (chunk) {
            let rows = chunk.split(/\r\n|\r|\n/);
            let headings = rows[0].split(",");
            let seperateHeadings = headings[0].split(";");
            seperateHeadings[4] = "articleCode";
            seperateHeadings[5] = "department";
            seperateHeadings[6] = "description";
            seperateHeadings[10] = "free";
            seperateHeadings[11] = "freeInCubicMeters";
            seperateHeadings[13] = "price";
            seperateHeadings[14] = "piecesPerRack";
            seperateHeadings[15] = "weight";
            headings[0] = seperateHeadings.join(";");
            rows[0] = headings.join(";");
            return rows.join("\r\n")
          },
          complete: function (results) {
            observable.next(results.data);
            observable.complete();
          }
          ,
          encoding: "UTF-8",
          header: true,
          skipEmptyLines: true,
          delimiter: ";"
        });
      }).subscribe(resultValue => {
      this.listOfLoads = deserialize<Load[]>(Load, resultValue);
      this.listOfLoads = this.filterLoads(this.listOfLoads, 190, 'Maaseik');
      this.pictureFiles = [];
      this.loadsChanged.next(this.listOfLoads);
    });
  }

  private filterLoads(loads: Load[], lowerLimit: number, departmentToFilter: string): Load[] {
    let listOfFilteredLoads: Load[] = [];
    for (let i = 0; i < loads.length; i++) {
      if (Number(loads[i].freeInCubicMeters.split(" ")[0]) >= lowerLimit && loads[i].department !== departmentToFilter) {
        listOfFilteredLoads.push(loads[i]);
      }
    }
    console.log(listOfFilteredLoads);
    return listOfFilteredLoads;
  }

}
