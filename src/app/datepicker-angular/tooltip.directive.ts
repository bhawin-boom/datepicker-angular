import {
   Directive, ElementRef, AfterViewInit, OnDestroy,
   Input, NgZone, Renderer2, ViewContainerRef
} from '@angular/core';

@Directive({
   selector: '[appTooltip]',
})

export class TooltipDirective implements AfterViewInit, OnDestroy {

   @Input() tooltipHideTimeout: any = 2400; 
   mouseEnterListener: Function;
   mouseLeaveListener: Function;
   container: any;
   tooltipText: any;
   _text: string;
   resizeListener: any;

   constructor(public el: ElementRef, public zone: NgZone,
               private renderer: Renderer2,
               private viewContainerRef: ViewContainerRef) { }

   ngAfterViewInit() {
      this.mouseEnterListener = this.onMouseEnter.bind(this);
      this.mouseLeaveListener = this.onMouseLeave.bind(this);
      this.el.nativeElement.addEventListener('mouseenter', this.mouseEnterListener);
      this.el.nativeElement.addEventListener('mouseleave', this.mouseLeaveListener);
   }

   onMouseEnter(e: Event) {
      this.show();
      setTimeout(() => { this.remove(); }, this.tooltipHideTimeout);
   }

   onMouseLeave(e: Event) {
      this.remove();
   }

   create() {
      let leftScrollPostion = 0;
      if (this.el.nativeElement && this.el.nativeElement.id === 'columnWithScroll') {
         leftScrollPostion = this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.scrollLeft;
      }
      const oTop = this.el.nativeElement.offsetTop;
      const oLeft = this.el.nativeElement.offsetLeft - leftScrollPostion;
      this.container = this.renderer.createElement('div');
      this.container.style.top = (oTop - 30) + 'px';
      this.container.style.left = (oLeft - 30) + 'px';
      this.container.id = 'tooltipDiv';
      const innerTextDiv = this.renderer.createElement('div');
      this.renderer.addClass(innerTextDiv, 'innerText');
      const innerText = this.renderer.createText(this.tooltipText);
      this.renderer.appendChild(innerTextDiv, innerText);
      this.renderer.appendChild(this.container, innerTextDiv);
      this.renderer.appendChild(this.el.nativeElement, this.container);
   }

   show() {
      this.create();
   }

   bindDocumentResizeListener() {
      this.zone.runOutsideAngular(() => {
         this.resizeListener = this.onWindowResize.bind(this);
         window.addEventListener('resize', this.resizeListener);
      });
   }

   onWindowResize(e: Event) {
      this.hide();
   }

   hide() {
      this.remove();
   }

   remove() {
      if (this.container && this.container.parentElement) {
         this.el.nativeElement.removeChild(this.container);
      }
   }

   get text(): string {
      return this._text;
   }

   @Input('appTooltip') set text(text: string) {
      this._text = text;
      if (this._text) {
         this.tooltipText = this._text.length > 0 ? this._text : 'Undefined';
      }
   }

   ngOnDestroy() {
   }

}


