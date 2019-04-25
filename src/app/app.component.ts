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

  constructor() {

  }

  ngOnInit() {
    this.minDate = new Date();
    this.minDate = new Date(this.minDate.setMonth(this.minDate.getMonth() - 3));
    this.maxDate = new Date();
    this.maxDate = new Date(this.maxDate.setMonth(this.maxDate.getMonth() + 3));
  }
}
