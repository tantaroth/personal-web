import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appUkIcon]',
})
export class UkIconDirective implements OnInit {
  @Input() appUkIcon: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    const element: HTMLElement = this.el.nativeElement;
    element.setAttribute('uk-icon', this.appUkIcon);
  }
}
