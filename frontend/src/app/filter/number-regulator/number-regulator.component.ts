import {Component, Input, OnInit} from '@angular/core';
import {FilterService} from "../filter.service";
import {Field} from "../models/Field";
import {Chip} from "../models/chip";
import {BehaviorSubject} from "rxjs";
import {InstanceComparison} from 'src/app/models/instance-comparison';

@Component({
    selector: 'app-number-regulator',
    templateUrl: './number-regulator.component.html',
    styleUrls: ['./number-regulator.component.scss']
})
export class NumberRegulatorComponent implements OnInit {
    @Input({required: true}) field!: Field;
    public minNumber$ = new BehaviorSubject<number>(0);
    public maxNumber$ = new BehaviorSubject<number>(0);
    public min!: number;
    public max!: number;
    public stepSize!: number;

    private disableUpdate = false;

    private chip!: Chip;


    ngOnInit(): void {
        this.chip = {
            name: this.field.name,
            optionText: "",
            filter: (element: InstanceComparison) => this.onFilter(element)
        }
        this.setMinAndMaxNumber();

        this.minNumber$.asObservable().subscribe(value => this.numberChanged());
        this.maxNumber$.asObservable().subscribe(value => this.numberChanged());
        this.filterService.getFilter().subscribe(value => this.filtersChanged());
    }

    constructor(public filterService: FilterService) {
    }

    private setMinAndMaxNumber() {
        if (this.field) {
            this.field.options = this.field.options.map(n => {
                if (typeof n == "string") {
                    return n.replaceAll(/[^\d.-]/g, '') as any * 1;
                }
                return n;
            }).filter(item => !isNaN(item));
            this.min = Math.min(...this.field.options as number[]);
            this.max = Math.max(...this.field.options as number[]);
            this.maxNumber$.next(this.max);
            this.minNumber$.next(this.min);
            if (this.min % 1 != 0 || this.max % 1 != 0) {
                this.stepSize = 0.1;
            } else {
                this.stepSize = 1;
            }
        }
    }

    private numberChanged() {
        if (this.disableUpdate) return;
        this.disableUpdate = true;

        let filters = this.filterService.getFilterValue();
        let newFilters = filters;
        if ((this.minNumber$.getValue() == this.min && this.maxNumber$.getValue() == this.max) && filters.indexOf(this.chip) != -1) {
            newFilters = filters.filter(f => f != this.chip);
            this.filterService.setFilter(newFilters);
        } else if (filters.indexOf(this.chip) == -1) {
            this.chip.optionText = `${this.minNumber$.getValue()} to ${this.maxNumber$.getValue()}`;
            if (filters.indexOf(this.chip) == -1) {
                newFilters = [...filters, this.chip];
            }
            this.filterService.setFilter(newFilters);
        } else {
            this.chip.optionText = `${this.minNumber$.getValue()} to ${this.maxNumber$.getValue()}`;
            // this.filterService.setFilter(newFilters);
        }
        this.disableUpdate = false;

    }

    private filtersChanged() {
        if (this.disableUpdate) return;
        let filters = this.filterService.getFilterValue();
        if (filters.indexOf(this.chip) == -1) {
            this.disableUpdate = true;
            this.maxNumber$.next(this.max);
            this.minNumber$.next(this.min);
            this.disableUpdate = false;
        }
    }

    onFilter(element: InstanceComparison): boolean {
        let newElement = element.fields[this.field.name].value.toString()
            .replaceAll(/[^\d.-]/g, '') as any * 1;
        return (newElement >= this.minNumber$.getValue() && newElement <= this.maxNumber$.getValue());
    }
}
