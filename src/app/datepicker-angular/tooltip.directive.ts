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
   Renderer,
   Output,
   Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({ selector: '[tooltip]' })

export class TootlipDirective {
     constructor(el: ElementRef, renderer: Renderer){
        
     }
}
