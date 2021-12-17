import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';

export const routes: Route[] = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: 'add',
    component: AddBookComponent,
  },
  {
    path: ':id',
    component: BookDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
