import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCharacter]',
})
export class CharacterDirective {
  @Input() length: number = 0;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 0;

  constructor(private el: ElementRef) {}

  @HostListener('window:keydown')
  @HostListener('window:keyup')
  checkLength() {
    if (this.length > 0 && (this.length < 10 || this.length > 100)) {
      this.el.nativeElement.style.color = 'red';
      return;
    }

    this.el.nativeElement.style.color = 'black';
  }
}
