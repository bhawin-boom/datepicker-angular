import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerDirective } from './datepicker.directive';
import { DatePickerService } from './datepicker.service';
import { BpDatePickerComponent } from './bp-datepicker.component';
import {TooltipDirective} from './tooltip.directive';

@NgModule({
    declarations: [
        BpDatePickerComponent,
        DatePickerDirective,
        TooltipDirective
    ],
    exports: [
        DatePickerDirective
    ],
    providers: [
        DatePickerService
    ],
    entryComponents: [
        BpDatePickerComponent
    ],
    imports: [
        CommonModule
    ]
})
export class BpDatePickerModule {}
