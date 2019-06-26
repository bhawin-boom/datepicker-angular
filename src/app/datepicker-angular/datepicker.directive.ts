import {
   Injectable,
   Injector,
   ComponentFactoryResolver,
   EmbeddedViewRef,
   ApplicationRef,
   Directive,
   Input,
   AfterViewInit,
   ElementRef,
   OnChanges,
   HostListener,
   SimpleChanges,
   EventEmitter,
   Output,
   Inject
} from '@angular/core';
import { BpDatePickerComponent } from './bp-datepicker.component';
import { DatePickerService } from './datepicker.service';
import { DOCUMENT } from '@angular/common';

@Directive({
   selector: `[bpDatePicker]`,
})
export class DatePickerDirective implements AfterViewInit, OnChanges {
   @Input() maxDate;
   @Input() minDate;
   @Input() disabledDates;
   @Input() closed;
   @Input() disableWeekends;
   @Output() dateEmitter = new EventEmitter();
   @Output() closedEmitter = new EventEmitter();
   @Input() selectedDate;
   @Input() dateRange;
   clickEventListener: any;
   component: any;
   domele: any;
   componentRef: any;

   constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private appRef: ApplicationRef,
      private injector: Injector,
      private elementRef: ElementRef,
      private datePickerService: DatePickerService,
      @Inject(DOCUMENT) private document: any) {
         // console.log('datepicker directive changes');
      }

   ngAfterViewInit() {
      this.datePickerService.getdateEmitter().subscribe(value => {
         this.dateEmitter.emit(value);
      });
      this.getData();
      // this.appendComponentToBody(BpDatePickerComponent);
   }

   @HostListener('window:resize', [])
   onWindowResize() {
      this.setElemPosition();
   }

   ngOnChanges(changes: SimpleChanges) {
      this.getData();
   }

   getData() {
      const data = {
         minDate: this.minDate,
         maxDate: this.maxDate,
         disabledDates: this.disabledDates,
         disableWeekends: this.disableWeekends,
         selectedDate: this.selectedDate,
         dateRange: this.dateRange
      };
      this.datePickerService.setProperties(data);
      if (this.closed) {
         this.close();
      } else {
         this.close();
         this.appendComponentToBody(BpDatePickerComponent);
      }
   }

   appendComponentToBody(component: any) {

      // console.log('to append on the body now');

      // 1. Create a component reference from the component
      const componentRef = this.componentFactoryResolver
         .resolveComponentFactory(component)
         .create(this.injector);

      this.componentRef = componentRef;

      // 2. Attach component to the appRef so that it's inside the ng component tree
      this.appRef.attachView(componentRef.hostView);

      // 3. Get DOM element from component
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
         .rootNodes[0] as HTMLElement;

      this.domele = domElem;
      document.body.appendChild(this.domele);
      setTimeout(() => {
         this.setElemPosition();
         this.document.addEventListener('click' , (event) => {
            this.checkClick(event.target);
         });
      }, 1);

   }

   checkClick(targetElement) {
      if (!this.dateRange) {
         const eleToPlace = this.document.getElementById('bp-datepicker-wrapper');
         if (eleToPlace) {
            const clickedInside = eleToPlace.contains(targetElement);
            const clickedInsideRef = this.elementRef.nativeElement.contains(targetElement);
            if (!clickedInside && !clickedInsideRef) {
               this.close();
               this.closedEmitter.emit(true);
            }
         }
      }
   }

   setElemPosition() {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      this.domele.style.position = 'absolute';
      this.domele.style.top = (rect.height + rect.top) + 'px';
      this.domele.style.left = rect.left + 'px';
      this.domele.style.width = Math.floor(rect.width) + 'px';
      this.domele.style.zIndex = '9999999999';
   }

   close() {
      if (this.componentRef) {
         this.appRef.detachView(this.componentRef.hostView);
         this.componentRef.destroy();
         this.document.removeEventListener('click' , () => {
         });
      }
   }

   open() {
      this.appendComponentToBody(BpDatePickerComponent);
   }

}

