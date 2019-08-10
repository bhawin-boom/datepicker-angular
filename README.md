## Datepicker Angular
A simple Datepicker plugin which is used for showing datepicker .

## Installation
`npm i bp-datepicker`

## Usage
`<input type="text" bpDatePicker />`

## Features

    Min date
The minDate feature disables the selection of any date previous to the date provided by user as input
`<input type="text" bpDatePicker [minDate]="javascript date object" />`

    Max date 
The maxDate feature disables the selection of any date ahead to the date provided by user as input
`<input type="text" bpDatePicker [maxDate]="javascript date object" />`

    Disable Weekends
The disable weekends feature disables the selection of any saturday and sunday in the given date range(min and max dates) .
`<input type="text" bpDatePicker [disableWeekends]="true/false" />`


    Disable particular dates 
The disable particular dates feature disables the selection of of the dates given by user as input .
`<input type="text" bpDatePicker [disabledDates]="array of javascript date object" />`

    Close Datepicker 
The close datepicker feature is used to hide and show the datepicker .
`<input type="text" bpDatePicker [closed]="true/false" />` 

    DateRange
You can now make this date picker as a daterange picker
`<input type="text" bpDatePicker [DateRange]="true" />`
Just keep it true when you want it , else just remove the `DateRange` tag
you can also set the from and to dates in DateRange 
`<input type="text" bpDatePicker [DateRange]="true" [fromDate]="javascript Date Object" [toDate]="javascript date Object"  />`
You can also keep the from Date Constant and allow user to only select toDate
`<input type="text" bpDatePicker [DateRange]="true" [fromDate]="javascript Date Object" [isFromDateConstant]="true"  />`

## Build

This plugin is both Jit and Aot compatible . You can make the build using `ng build` and `ng build --prod --aot` . It will work for both . 

## Code

[codebase](https://github.com/bhawin-boom/datepicker-angular)

## Further Help
Name: Bhawin Parkeria 
Email : bhawin.parkeria@gmail.com