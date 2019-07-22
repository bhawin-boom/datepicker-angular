import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerDirective } from './datepicker.directive';
import { DatePickerService } from './datepicker.service';
import { BpDatePickerComponent } from './bp-datepicker.component';

@NgModule({
    declarations: [
        BpDatePickerComponent,
        DatePickerDirective
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
