import { Component, Input, OnInit } from "@angular/core";
import { FilterService } from "../filter.service";
import { Field } from "../models/Field";
import { FormControl } from "@angular/forms";
import { Chip } from "../models/chip";
import { InstanceComparison } from "src/app/models/instance-comparison";

// this is the dropdown regulator component
// it is used to display a dropdown for a field
// it is used to filter the instances based on the selected option
@Component({
  selector: "app-dropdown-regulator",
  templateUrl: "./dropdown-regulator.component.html",
  styleUrls: ["./dropdown-regulator.component.scss"]
})
export class DropdownRegulatorComponent implements OnInit {
  // the field that is used to display the dropdown
  @Input({ required: true }) field!: Field;
  // the selected option of the dropdown it defaults to unselected
  selectedOption = new FormControl("unselected");
  // the chip that is used to filter the instances it contains a filter function
  private chip!: Chip;
  // the constructor of the dropdown regulator component
  // @param filterService the filter service that is used to get the current filters and to set the new filters
  constructor(public filterService: FilterService) {
    // subscribe to the selected option and call the selectionChanged function when the selected option changes
    this.selectedOption.valueChanges.subscribe(value => this.selectionChanged());
    // subscribe to the filters and call the filtersChanged function when the filters change
    this.filterService.getFilter().subscribe(value => this.filtersChanged());
  }

  // this function is called when the selected option changes
  // it sets the new filters
  // it removes the filter if the selected option is unselected
  // it also adds a filter option if the selected option is not unselected
  private selectionChanged() {
    // get the current filters
    let filters = this.filterService.getFilterValue();
    let newFilters = filters;
    if ((this.selectedOption.value == "unselected") && filters.indexOf(this.chip) != -1) {
      // if the selected option is unselected and the chip is in the filters remove the chip from the filters
      newFilters = filters.filter(f => f != this.chip);
      this.filterService.setFilter(newFilters);
    } else if (this.selectedOption.value != "unselected" && this.selectedOption.value) {
      // if the selected option is not unselected and the chip is not in the filters add the chip to the filters
      this.chip.optionText = `${this.field.name}: ${this.selectedOption.value}`;
      if (filters.indexOf(this.chip) == -1) {
        newFilters = [...filters, this.chip];
      }
      // we se the new filters
      this.filterService.setFilter(newFilters);
    }
  }

  // this function is called when the filters change
  // it sets the selected option to unselected if the chip is not in the filters anymore
  private filtersChanged() {
    let filters = this.filterService.getFilterValue();
    if (filters.indexOf(this.chip) == -1) {
      this.selectedOption.setValue("unselected");
    }
  }

  // this function is called when the component is initialized
  // it sets the chip and the filter function
  ngOnInit(): void {
    this.chip = {
      name: this.field.name,
      optionText: "",
      filter: (element: InstanceComparison) => this.onFilter(element)
    };
  }

  // this function is called when the filter function is called
  // it returns true if the element should be displayed in the list and false if not
  onFilter(element: InstanceComparison): boolean {
    return (element.fields[this.field.name].value == this.selectedOption.value);
  }
}
