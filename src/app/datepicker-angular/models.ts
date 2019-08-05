export interface IDatePickerProperties {
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: any;
    selectedDate?: Date;
    disableWeekends?: boolean;
    dateRange?: boolean;
    fromDate?: Date;
    toDate?: Date;
    isFromDateConstant?: boolean;
}