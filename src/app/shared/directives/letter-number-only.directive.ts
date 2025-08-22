import { Directive, ElementRef, HostListener } from '@angular/core';
import { GlobalFunction } from '../config/global-functions';

@Directive({
  selector: '[letterAndNumberOnly]'
})
export class LetterNumberOnlyDirective {
  private regex: RegExp = new RegExp(GlobalFunction.LETTERS_NUMBERS_PATTERN);
  private specialKeys: Array<string> = GlobalFunction.SPECIAL_KEYS;

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
      if (this.specialKeys.indexOf(event.key) !== -1) {
          return;
      }

      let current: string = this.el.nativeElement.value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
          event.preventDefault();
      }
  }
}
