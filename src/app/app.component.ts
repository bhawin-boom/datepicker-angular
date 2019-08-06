import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'component-library';
  date = new Date();
  minDate: any;
  maxDate: any;
  disabledDates: any;
  isClosed = true;
  disabledDate = new Date();
  fromDate: Date;

  constructor() {

  }

  ngOnInit() {
    this.disabledDates = [];
    this.setDisableDates();
    this.minDate = new Date();
    this.minDate = new Date(this.minDate.setMonth(this.minDate.getMonth() - 3));
    this.maxDate = new Date();
    this.maxDate = new Date(this.maxDate.setMonth(this.maxDate.getMonth() + 3));
  }

  setDisableDates() {
    for (let i = 1 ; i < 30; ++i) {
      const date = new Date(this.disabledDate);
      date.setDate(date.getDate() + i*2);
      console.log(date);
      this.disabledDates.push({"date": date , "description": 'Today is holiday'});
    }
  }

  toggleClosed() {
    this.isClosed = !this.isClosed;
  }

  closeCalled(data) {
    this.isClosed = true;
  }
}
