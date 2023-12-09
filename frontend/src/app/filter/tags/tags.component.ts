import { Component } from "@angular/core";
import { FilterService } from "../filter.service";
import { Chip } from "../models/chip";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.scss"]
})
export class TagsComponent {

  constructor(public filterService: FilterService) {
  }

  public remove(chip: Chip) {
    let filterValue = this.filterService.getFilterValue();
    filterValue = filterValue.filter(i => i != chip);
    this.filterService.setFilter(filterValue);
  }

}
