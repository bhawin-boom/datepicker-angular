/*
developer : Bhawin Parkeria
email: bhawin.parkeria@gmail.com
*/

import { Input, OnInit, Component, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BpDatePickerConstants } from './bp-datepicker.constants';
import { DatePickerService } from './datepicker.service';

@Component({
  selector: 'app-bp-datepicker',
  templateUrl: './bp-datepicker.component.html',
  styleUrls: ['./bp-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BpDatePickerComponent implements OnInit, OnDestroy {
  minDate: Date;
  maxDate: Date;
  disabledDates: any;
  disableWeekends: boolean;
  selectedDate: Date;
  selectedDateEventEmitter = new EventEmitter();
  currentDate: Date;
  year: number;
  yearumber: number;
  yearArray: any;
  month: string;
  monthNumber: number;
  monthsData: any;
  firstDay: Date;
  lastDay: Date;
  months = BpDatePickerConstants.months;
  days = BpDatePickerConstants.weeks;
  viewTypes = BpDatePickerConstants.viewTypes;
  currentViewType: string;
  dateArray: Array<Array<any>>;
  weekCount: number;
  weekArray: Array<any>;
  propertiesSubscriber: any;
  dateRange: boolean;
  fromDate: any;
  toDate: any;

  constructor(private datePickerService: DatePickerService) { }

  ngOnInit() {
    // if you reached here and seen this code and understood in 1 day . Then i must say that you are the goat .
    this.propertiesSubscriber = this.datePickerService.getDatePickerProperties().subscribe((properties) => {
      this.minDate = properties.minDate;
      this.maxDate = properties.maxDate;
      this.disableWeekends = properties.disableWeekends;
      this.disabledDates = properties.disabledDates;
      this.selectedDate = properties.selectedDate;
      this.dateRange = properties.dateRange;
      this.getCalenderInfo();
    });
    const data = this.datePickerService.getDefaultProperties();
    this.minDate = data.minDate;
    this.maxDate = data.maxDate;
    this.disabledDates = data.disabledDates;
    this.disableWeekends = data.disableWeekends;
    this.selectedDate = data.selectedDate;
    this.dateRange = data.dateRange;
    this.getCalenderInfo();
  }

  ngOnDestroy() {
    if (this.propertiesSubscriber) {
      this.propertiesSubscriber.unsubscribe();
    }
  }

  getCalenderInfo() {
    this.currentDate = new Date();
    if (this.selectedDate) {
      this.currentDate = new Date(this.selectedDate);
    }
    if (!this.currentViewType) {
      this.currentViewType = this.viewTypes.dateView;
    }
    this.paint();
  }

  paint() {
    if (this.currentViewType === this.viewTypes.dateView) {
      this.publishDateCalender();
    } else if (this.currentViewType === this.viewTypes.monthView) {
      this.publishMonthCalender();
    } else {
      this.publishYearCalender();
    }
  }

  publishYearCalender() {
    const year = this.currentDate.getFullYear();
    const rem = (year - 1971) % 16;
    const div = Math.floor((year - 1971) / 16);
    const startPoint = 1971 + (div * 16);
    if (startPoint === 1971) {
      return false;
    }
    this.yearArray = [];
    for (let i = startPoint; i < startPoint + 16; ++i) {
      this.yearArray.push({ 'name': i, 'disabled': this.checkifYearDisabled(i) });
    }
  }

  checkifYearDisabled(year) {
    if (this.minDate && year < this.minDate.getFullYear()) {
      return true;
    }
    if (this.maxDate && year > this.maxDate.getFullYear()) {
      return true;
    }
    return false;
  }

  publishMonthCalender() {
    this.year = this.currentDate.getFullYear();
    this.monthsData = [];
    this.monthsData.push({ 'value': 0, 'name': this.months[0], 'disabled': this.isMonthDisabled(0) });
    this.monthsData.push({ 'value': 1, 'name': this.months[1], 'disabled': this.isMonthDisabled(1) });
    this.monthsData.push({ 'value': 2, 'name': this.months[2], 'disabled': this.isMonthDisabled(2) });
    this.monthsData.push({ 'value': 3, 'name': this.months[3], 'disabled': this.isMonthDisabled(3) });
    this.monthsData.push({ 'value': 4, 'name': this.months[4], 'disabled': this.isMonthDisabled(4) });
    this.monthsData.push({ 'value': 5, 'name': this.months[5], 'disabled': this.isMonthDisabled(5) });
    this.monthsData.push({ 'value': 6, 'name': this.months[6], 'disabled': this.isMonthDisabled(6) });
    this.monthsData.push({ 'value': 7, 'name': this.months[7], 'disabled': this.isMonthDisabled(7) });
    this.monthsData.push({ 'value': 8, 'name': this.months[8], 'disabled': this.isMonthDisabled(8) });
    this.monthsData.push({ 'value': 9, 'name': this.months[9], 'disabled': this.isMonthDisabled(9) });
    this.monthsData.push({ 'value': 10, 'name': this.months[10], 'disabled': this.isMonthDisabled(10) });
    this.monthsData.push({ 'value': 11, 'name': this.months[11], 'disabled': this.isMonthDisabled(11) });
  }

  isMonthDisabled(month) {
    const date = new Date(this.year, month);
    if (!this.minDate && !this.maxDate) {
      return false;
    }
    if (!this.minDate && this.maxDate) {
      if (date <= this.maxDate) {
        return false;
      } else {
        return true;
      }
    }
    if (!this.maxDate && this.minDate) {
      const minDate = new Date(this.minDate);
      minDate.setDate(1);
      minDate.setHours(0, 0, 0, 0);
      if (date >= this.minDate) {
        return false;
      } else {
        return true;
      }
    }

    if (this.minDate && this.maxDate) {
      const minDate = new Date(this.minDate);
      minDate.setDate(1);
      minDate.setHours(0, 0, 0, 0);
      if (date >= minDate && date <= this.maxDate) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  publishDateCalender() {
    // refresh date array
    this.year = this.currentDate.getFullYear();
    this.monthNumber = this.currentDate.getMonth();
    this.firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    this.lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    this.month = this.months[this.monthNumber];
    this.dateArray = [];
    this.dateArray.length = 0;
    let offset = this.firstDay.getDay();
    let count = 1;
    this.weekCount = this.weeksinMonth();
    this.weekArray = new Array(this.weekCount);
    for (let i = 0; i < this.weekCount; ++i) {
      this.dateArray[i] = [];
      for (let j = 0; j < 7; ++j) {
        if (offset === 0) {
          const date = new Date(this.firstDay.getTime());
          date.setDate(date.getDate() + (count - 1));
          // tslint:disable-next-line:max-line-length
          this.dateArray[i].push({ 'dateNumber': date.getDate(), 'date': date, 'disabled': ((this.minDate && this.compareMinDate(date)) || (this.maxDate && this.compareMaxDate(date)) || this.isDateDisabled(date)), 'selected': this.getSelected(date), 'description': this.getDescription(date), 'rangeSelectedMid': this.getRangeSelectedMid(date), 'rangeSelectedStart': this.getRangeSelectedStart(date), 'rangeSelectedEnd': this.getRangeSelectedEnd(date), 'onlyFromDate': this.onlyFromDate() });

          if (count === this.lastDay.getDate()) {
            break;
          }
          ++count;
        } else {
          this.dateArray[i].push(null);
          --offset;
        }
      }
    }
  }

  getRangeSelectedMid(date) {
    if (!this.fromDate) {
      return false;
    } else {
      const fromDate = this.fromDate;
      // tslint:disable-next-line:max-line-length
      // if (this.fromDate.getDate() === date.getDate() && this.fromDate.getFullYear() === date.getFullYear() && this.fromDate.getMonth() === date.getMonth()) {
      //   return true;
      // }
      if (this.toDate) {
        // tslint:disable-next-line:max-line-length
        // if (this.toDate.getDate() === date.getDate() && this.toDate.getFullYear() === date.getFullYear() && this.toDate.getMonth() === date.getMonth()) {
        //   return true;
        // }
        if (date > this.fromDate && date < this.toDate) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  getRangeSelectedStart(date) {
    if (!this.fromDate) {
      return false;
    } else {
      const fromDate = this.fromDate;
      // tslint:disable-next-line:max-line-length
      if (this.fromDate.getDate() === date.getDate() && this.fromDate.getFullYear() === date.getFullYear() && this.fromDate.getMonth() === date.getMonth()) {
        return true;
      } else {
        return false;
      }
    }
  }

  getRangeSelectedEnd(date) {
    if (this.toDate) {
      // tslint:disable-next-line:max-line-length
      if (this.toDate.getDate() === date.getDate() && this.toDate.getFullYear() === date.getFullYear() && this.toDate.getMonth() === date.getMonth()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onlyFromDate(){
    if(this.fromDate && !this.toDate) {
      return true;
    }else {
      return false;
    }
  }

  compareMinDate(date) {
    if (date.getFullYear() < this.minDate.getFullYear()) {
      return true;
    } else if (date.getFullYear() === this.minDate.getFullYear() && date.getMonth() < this.minDate.getMonth()) {
      return true;
      // tslint:disable-next-line:max-line-length
    } else if (date.getFullYear() === this.minDate.getFullYear() && date.getMonth() === this.minDate.getMonth() && date.getDate() < this.minDate.getDate()) {
      return true;
    }
    return false;
  }

  compareMaxDate(date) {
    if (date.getFullYear() > this.maxDate.getFullYear()) {
      return true;
    } else if (date.getFullYear() === this.maxDate.getFullYear() && date.getMonth() > this.maxDate.getMonth()) {
      return true;
      // tslint:disable-next-line:max-line-length
    } else if (date.getFullYear() === this.maxDate.getFullYear() && date.getMonth() === this.maxDate.getMonth() && date.getDate() > this.maxDate.getDate()) {
      return true;
    }
    return false;
  }

  getDescription(date) {
    if (this.disabledDates) {
      const data = this.disabledDates.find(dateData => {
        return (dateData.date.getFullYear() === date.getFullYear() &&
          dateData.date.getMonth() === date.getMonth() &&
          dateData.date.getDate() === date.getDate());
      });
      return data && data.description ? data.description : '';
    } else {
      return '';
    }
  }

  isDateDisabled(date) {
    if (this.disableWeekends && (date.getDay() === 6 || date.getDay() === 0)) {
      return true;
    }
    if (this.disabledDates) {
      const data = this.disabledDates.find(dateData => {
        return (dateData.date.getFullYear() === date.getFullYear() &&
          dateData.date.getMonth() === date.getMonth() &&
          dateData.date.getDate() === date.getDate());
      });
      return data ? true : false;
    } else {
      return false;
    }
  }

  getSelected(date) {
    if (!this.selectedDate) {
      return false;
    }
    if (this.selectedDate.getMonth() !== date.getMonth() ||
      this.selectedDate.getDate() !== date.getDate() ||
      this.selectedDate.getFullYear() !== date.getFullYear()
    ) {
      return false;
    }
    return true;
  }

  weeksinMonth() {
    const dayThreshold = [5, 1, 5, 6, 5, 6, 5, 5, 6, 5, 6, 5];
    const firstDay = new Date(this.year, this.monthNumber, 1).getDay();
    const baseWeeks = (this.monthNumber === 1 ? 4 : 5);
    return baseWeeks + (firstDay >= dayThreshold[this.monthNumber] ? 1 : 0);
  }

  next() {
    if (this.currentViewType === this.viewTypes.dateView) {
      this.getNextMonth();
    }
    if (this.currentViewType === this.viewTypes.monthView) {
      this.getNextYear();
    }
    if (this.currentViewType === this.viewTypes.yearView) {
      this.getNextYears();
    }
  }

  getNextYears() {
    if (this.maxDate && this.currentDate.getFullYear() >= this.maxDate.getFullYear()) {
      return false;
    } else {
      const date = new Date(this.currentDate);
      date.setFullYear(date.getFullYear() + 16);
      const newDate = new Date();
      newDate.setFullYear(newDate.getFullYear() + 16);
      if (date.getFullYear() > newDate.getFullYear()) {
        return false;
      }
    }
    this.currentDate.setFullYear(this.currentDate.getFullYear() + 16);
    this.paint();
  }

  getNextMonth() {
    // tslint:disable-next-line:max-line-length
    if (this.maxDate && this.currentDate.getMonth() >= this.maxDate.getMonth() && this.currentDate.getFullYear() === this.maxDate.getFullYear()) {
      return false;
    }
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.paint();
  }

  getNextYear() {
    if (this.maxDate && this.currentDate.getFullYear() >= this.maxDate.getFullYear()) {
      return false;
    }
    this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
    this.paint();
  }

  prev() {
    if (this.currentViewType === this.viewTypes.dateView) {
      this.getPrevMonth();
    }
    if (this.currentViewType === this.viewTypes.monthView) {
      this.getprevYear();
    }
    if (this.currentViewType === this.viewTypes.yearView) {
      this.getprevYears();
    }
  }

  getprevYears() {
    if (this.minDate && this.currentDate.getFullYear() <= this.minDate.getFullYear()) {
      return false;
    } else {
      const date = new Date(this.currentDate);
      date.setFullYear(date.getFullYear() - 16);
      const newDate = new Date();
      newDate.setFullYear(newDate.getFullYear() - 16);
      if (date.getFullYear() < newDate.getFullYear()) {
        return false;
      }
    }
    this.currentDate.setFullYear(this.currentDate.getFullYear() - 16);
    this.paint();
  }

  getprevYear() {
    if (this.minDate && this.currentDate.getFullYear() <= this.minDate.getFullYear()) {
      return false;
    }
    this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
    this.paint();
  }

  getPrevMonth() {
    // tslint:disable-next-line:max-line-length
    if (this.minDate && this.currentDate.getMonth() <= this.minDate.getMonth() && this.currentDate.getFullYear() === this.minDate.getFullYear()) {
      return false;
    }
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.paint();
  }

  setSelection(day) {
    if (this.dateRange) {
      if (!this.fromDate) {
        this.fromDate = day.date;
      } else if (this.fromDate && !this.toDate) {
        // tslint:disable-next-line:max-line-length
        if (this.fromDate.getMonth() === day.date.getMonth() && this.fromDate.getFullYear() === day.date.getFullYear() && this.fromDate.getDate() === day.date.getDate() ) {
          this.toDate = day.date;
          this.paint();
          return true;
        } else if (day.date < this.fromDate) {
          const dateData = new Date(day.date);
          this.fromDate = dateData;
        } else {
          this.toDate = day.date;
        }
      } else if (this.fromDate && this.toDate) {
        this.fromDate = null;
        this.toDate = null;
        this.setSelection(day);
      }
    } else {
      this.selectedDate = day.date;
    }
    this.paint();
    this.emitSelectedDate();
  }

  emitSelectedDate() {
    if (this.dateRange) {
      let data = [];
      data.push(this.fromDate);
      data.push(this.toDate);
      this.datePickerService.setDateEmitter(data);
    } else {
      this.datePickerService.setDateEmitter(this.selectedDate);
    }
  }

  getMonthView() {
    this.currentViewType = this.viewTypes.monthView;
    this.paint();
  }

  getSelectedMonth(month) {
    if (month.disabled) {
      return false;
    }
    this.currentDate.setMonth(month.value);
    this.currentViewType = this.viewTypes.dateView;
    this.paint();
  }

  getYearView() {
    this.currentViewType = this.viewTypes.yearView;
    this.paint();
  }

  getSelectedYear(year) {
    if (year.disabled) {
      return false;
    }
    this.currentDate.setFullYear(year.name);
    this.currentViewType = this.viewTypes.monthView;
    this.paint();
  }

}
