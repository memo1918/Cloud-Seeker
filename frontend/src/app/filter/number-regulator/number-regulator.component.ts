import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FilterService} from "../filter.service";
import {Field} from "../models/Field";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-number-regulator',
    templateUrl: './number-regulator.component.html',
    styleUrls: ['./number-regulator.component.scss']
})
export class NumberRegulatorComponent implements OnInit {
    @Input({required: true}) field!: Field;
    public minNumber: number | undefined;
    public maxNumber: number | undefined;
    min = new FormControl(1);
    max = new FormControl(2);

    ngOnInit(): void {
        this.setMinAndMaxNumber();
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
            this.min.setValue(Math.min(...this.field.options as number[]));
            this.max.setValue(Math.max(...this.field.options as number[]));
            this.minNumber = Math.min(...this.field.options as number[]);
            this.maxNumber = Math.max(...this.field.options as number[]);
        }
    }
}
