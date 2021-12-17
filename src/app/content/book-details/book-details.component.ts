import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FireApiService } from 'src/app/services/fire-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Status, WhenToStartReading } from '../content.model';
import { BookBody, BookItemResult } from '../models/book.model';
import { BookApiService } from '../services/book-api.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  storeData$: Observable<BookBody | undefined> | undefined;
  bookData$: Observable<BookItemResult> | undefined;
  id: string = '';

  Status = Status;
  WhenToStartReading = WhenToStartReading;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fireApiService: FireApiService,
    private bookApiService: BookApiService,
    private loadingService: LoadingService
  ) {}

  private initBookDetails() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.loadingService.start();

    this.storeData$ = this.fireApiService.getBook(this.id).pipe(
      tap((x) => {
        if (x) {
          this.bookData$ = this.bookApiService.getBookById(x.id);
        }
      }),
      finalize(() => this.loadingService.stop())
    );
  }

  goBack() {
    this.router.navigate(['content']);
  }

  ngOnInit() {
    this.initBookDetails();
  }

  delete() {
    this.loadingService.start();
    this.fireApiService
      .removeBook(this.id)
      .pipe(finalize(() => {
        this.loadingService.stop();
        this.goBack();
      }))
      .subscribe();
  }
}
