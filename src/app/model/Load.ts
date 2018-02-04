/**
 * Created by Frederic on 27-6-2017.
 */

export class Load{
  public batch: string;
  public articleCode: string;
  public department: string;
  public description: string;
  public free: number;
  public freeInCubicMeters: string;
  public price: number;
  public piecesPerRack: number;
  public weight: number;
  public pictureLocation: string;


  constructor(batch: string , articleCode: string, department: string, description: string, free: number, freeInCubicMeters: string, price: number, piecesPerRack: number, weight: number, pictureLocation: string) {
    this.batch = batch;
    this.articleCode = articleCode;
    this.department = department;
    this.description = description;
    this.free = free;
    this.freeInCubicMeters = freeInCubicMeters;
    this.price = price;
    this.piecesPerRack = piecesPerRack;
    this.weight = weight;
    this.pictureLocation = pictureLocation;
  }
}
