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
import { DOCUMENT, formatDate } from '@angular/common';

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
   @Input() fromDate;
   @Input() toDate;
   @Input() isFromDateConstant;
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
      }

   ngAfterViewInit() {
      this.datePickerService.getdateEmitter().subscribe(value => {
         this.dateEmitter.emit(value);
      });
      this.getData();
   }

   @HostListener('window:resize', [])
   onWindowResize() {
      if (this.componentRef) {
         this.setElemPosition();
      }
   }

   @HostListener('window:scroll', [])
   onWindowScroll() {
      if(this.componentRef) {
         this.setElemPosition();
      }
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
         dateRange: this.dateRange,
         fromDate: this.fromDate,
         toDate: this.toDate,
         isFromDateConstant: this.isFromDateConstant
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
      this.componentRef.changeDetectorRef.detectChanges();

      // 2. Attach component to the appRef so that it's inside the ng component tree
      this.appRef.attachView(componentRef.hostView);

      // 3. Get DOM element from component
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
         .rootNodes[0] as HTMLElement;

      this.domele = domElem;
      document.body.appendChild(this.domele);
      this.domele.style.display = 'none';
      setTimeout(() => {
         this.setElemPosition();
         const eventListerer = this.document.addEventListener('click' , (event) => {
            this.checkClick(event.target);
         });
         window.addEventListener('scroll', this.scroll , true);
      }, 1);

   }

   checkClick(targetElement) {
      if (targetElement === this.elementRef.nativeElement) {
         return false;
      }
      if (!this.dateRange) {
         const eleToPlace = this.document.getElementById('bp-datepicker-wrapper');
         if (eleToPlace) {
            const clickedInside = eleToPlace.contains(targetElement.parentNode);
            const clickedInsideRef = this.elementRef.nativeElement.contains(targetElement.parentNode);
            if (!clickedInside && !clickedInsideRef) {
               this.close();
               this.closedEmitter.emit(true);
            }
         }
      } else {
         const eleToPlace = this.document.getElementById('bp-datepicker-wrapper');
         if (eleToPlace) {
            const clickedInside = eleToPlace.contains(targetElement.parentNode);
            if (!clickedInside) {
               if (targetElement.classList.contains('dateData')) {
                  return false;
               }
               this.close();
               this.closedEmitter.emit(true);
            }
         }
      }
   }


   scroll = (): void => {
      this.setElemPosition();
   }

   setElemPosition() {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      this.domele.style.position = 'absolute';
      this.domele.style.top = (rect.height + rect.top) + window.scrollY + 'px';
      this.domele.style.left = rect.left + 'px';
      this.domele.style.width = Math.floor(rect.width) + 'px';
      this.domele.style.zIndex = '2147483646';
      this.domele.style.display = 'block';
   }

   close() {
      if (this.componentRef) {
         this.appRef.detachView(this.componentRef.hostView);
         this.componentRef.destroy();
         this.document.removeEventListener('click' , () => {
         });
         window.removeEventListener('scroll', this.scroll , true);
      }
   }

   open() {
      this.appendComponentToBody(BpDatePickerComponent);
   }

}

