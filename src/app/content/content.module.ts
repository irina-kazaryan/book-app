import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ContentRoutingModule } from './content-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddBookComponent } from './add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BookApiService,
  MovieApiService,
} from './services';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListItemComponent } from './book-list/book-list-item/book-list-item.component';
import { CharacterDirective } from './add-book/character.directive';
import { OutOfPipe } from './out-of.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentRoutingModule,
    SharedModule,
  ],
  declarations: [
    ContentComponent,
    AddBookComponent,
    BookListComponent,
    BookDetailsComponent,
    BookListItemComponent,
    CharacterDirective,
    OutOfPipe
  ],
  providers: [BookApiService, MovieApiService],
})
export class ContentModule {}
