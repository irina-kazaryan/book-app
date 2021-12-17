import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [SignInComponent, SignUpComponent]
})
export class AuthModule { }
