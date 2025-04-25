import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[scrollOnOverflow]'
})
export class ScrollOnOverflowDirective implements AfterViewInit {
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngAfterViewInit() {
        const element = this.el.nativeElement;

        const isOverflowing = element.scrollWidth > element.clientWidth;

        if (isOverflowing) {
            this.renderer.addClass(element, 'animate-marquee');
        }
    }
}
