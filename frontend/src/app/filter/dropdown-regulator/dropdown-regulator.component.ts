import {Component, Input, OnInit} from '@angular/core';
import {FilterService} from "../filter.service";
import {Field} from "../models/Field";
import {FormControl} from "@angular/forms";
import {Chip} from "../models/chip";
import {InstanceComparison} from 'src/app/models/instance-comparison';

@Component({
    selector: 'app-dropdown-regulator',
    templateUrl: './dropdown-regulator.component.html',
    styleUrls: ['./dropdown-regulator.component.scss']
})
export class DropdownRegulatorComponent implements OnInit {
    @Input({required: true}) field!: Field;
    selectedOption = new FormControl("unselected");
    private chip!: Chip;

    constructor(public filterService: FilterService) {
        this.selectedOption.valueChanges.subscribe(value => this.selectionChanged())
        this.filterService.getFilter().subscribe(value => this.filtersChanged())
    }

    private selectionChanged() {
        let filters = this.filterService.getFilterValue();
        let newFilters = filters;
        if ((this.selectedOption.value == "unselected") && filters.indexOf(this.chip) != -1) {
            newFilters = filters.filter(f => f != this.chip);
            this.filterService.setFilter(newFilters);
        } else if (this.selectedOption.value != "unselected" && this.selectedOption.value) {
            this.chip.optionText = this.selectedOption.value;
            if (filters.indexOf(this.chip) == -1) {
                newFilters = [...filters, this.chip];
            }
            this.filterService.setFilter(newFilters);
        }
    }

    private filtersChanged() {
        let filters = this.filterService.getFilterValue();
        if (filters.indexOf(this.chip) == -1) {
            this.selectedOption.setValue("unselected");
        }
    }

    ngOnInit(): void {
        this.chip = {
            name: this.field.name,
            optionText: "",
            filter: (element: InstanceComparison) => this.onFilter(element)
        }
    }

    onFilter(element: InstanceComparison): boolean {
        return (element.fields[this.field.name].value == this.selectedOption.value)
    }
}
