import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MustMatchDirective } from './directives/must-match.directive';
import { LoadingComponent, LoadingSpinnerComponent } from './loading';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [TranslateModule, MustMatchDirective, LoadingComponent],
  declarations: [MustMatchDirective, LoadingComponent, LoadingSpinnerComponent]
})
export class SharedModule { }
