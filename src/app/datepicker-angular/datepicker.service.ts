import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDatePickerProperties } from './models';
import { Subject } from 'rxjs';

@Injectable()
export class DatePickerService {
   defaultProperties: IDatePickerProperties = {
      minDate: null,
      maxDate: null,
      selectedDate: null,
      disabledDates: null
   };

   private datepickerProperties = new Subject<IDatePickerProperties>();

   private dateEmitter = new Subject<any>();

   constructor() {}

   getDatePickerProperties(): Observable<IDatePickerProperties> {
      return this.datepickerProperties.asObservable();
   }

   getdateEmitter(): Observable<any> {
      return this.dateEmitter.asObservable();
   }

   setDateEmitter(value) {
      this.dateEmitter.next(value);
   }

   getDefaultProperties() {
      return this.defaultProperties;
   }

   setProperties(properties: IDatePickerProperties) {
      this.defaultProperties = Object.assign({}, this.defaultProperties, properties);
      this.datepickerProperties.next(this.defaultProperties);
   }

}
