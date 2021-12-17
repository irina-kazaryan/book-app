import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    PageNotFoundComponent
  ],
  declarations: [HeaderComponent, PageNotFoundComponent]
})
export class ShellModule { }
