import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shell/page-not-found/page-not-found.component';

import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectLoggedInToItems = () => redirectLoggedInTo(['content']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);

const routes: Routes = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems },
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'content',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () =>
      import('./content/content.module').then((module) => module.ContentModule),
  },
  {
    path: '**',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
