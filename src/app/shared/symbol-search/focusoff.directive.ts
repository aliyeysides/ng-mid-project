import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appFocusoff]'
})
export class FocusoffDirective {
  @HostListener('mousedown', ['$event'])
  offFocus(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  constructor() { }

}
