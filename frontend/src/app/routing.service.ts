import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CategoryService} from "./category/category.service";
import {FilterService} from "./filter/filter.service";

@Injectable({
  providedIn: "root"
})
export class RoutingService {

  private destination: BehaviorSubject<string> = new BehaviorSubject<string>("/");

  constructor(public categoryService: CategoryService, public filterService: FilterService) {
    //@ts-ignore
    window["RoutingService"] = this;
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
