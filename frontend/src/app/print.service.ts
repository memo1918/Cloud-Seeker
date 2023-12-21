import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  public isPrinting : boolean = false;
  constructor() {

  }
  public async print() {
    this.isPrinting = true;
    await new Promise(resolve => setTimeout(resolve, 0));
    window.print();
    this.isPrinting = false;
  }
}
