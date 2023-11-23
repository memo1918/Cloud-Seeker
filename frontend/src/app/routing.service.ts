import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RoutingService {

  private destination: BehaviorSubject<string> = new BehaviorSubject<string>("/");

  constructor() {
  }

  getDestination() {
    return this.destination.getValue();
  }

  getDestinationObservable() {
    return this.destination.asObservable();
  }

  setDestination(destination: string) {
    return this.destination.next(destination);
  }
}
