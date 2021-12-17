import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { FireApiService } from 'src/app/services/fire-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { BookItemResult, BookListItem, BookWithDocId } from '../models/book.model';
import { BookApiService } from '../services/book-api.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books$: Observable<BookListItem[]> | undefined;

  constructor(
    private loadingService: LoadingService,
    private fireApiService: FireApiService,
    private bookApiService: BookApiService,
    private router: Router
  ) {}

  private mapBookData(data: BookWithDocId[]) {
    return data.map((d) =>
      this.bookApiService.getBookById(d.id).pipe(
        map<BookItemResult, BookListItem>((book) => ({
          book,
          data: d,
        }))
      )
    );
  }

  ngOnInit() {
    this.loadingService.start();
    this.books$ = this.fireApiService.getBooks().pipe(
      switchMap((data) => forkJoin(this.mapBookData(data))),
      finalize(() => this.loadingService.stop())
    );
  }

  goToAddBook() {
    this.router.navigate(['content/add']);
  }
}
