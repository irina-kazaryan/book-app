import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { EventBusService } from 'src/app/services/event-bus.service';
import {
  FORM_RESET_EVENT_KEY,
  RATINGS,
  Status,
  WhenToStartReading,
  WhenToStartReadingSelect,
  WHEN_TO_START_READING,
} from '../content.model';
import { Book, BookBody } from '../models';
import { AddBookFacade } from './add-book.facade';
import { AddBookStorage } from './add-book.storage';

const COMMENT_MIN_LENGTH: number = 10;
const COMMENT_MAX_LENGTH: number = 100;

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  providers: [AddBookFacade, AddBookStorage],
})
export class AddBookComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  form: FormGroup = new FormGroup({});

  searchKey: string = '';

  searchHasError = false;

  selectedBook$: Observable<Book> | null = null;

  status = Status;

  get lastThreeSearches(): string[] {
    return this.facade.lastThreeSearches;
  }

  submitted = false;

  get ratings(): number[] {
    return RATINGS;
  }

  get reviewMinLength(): number {
    return COMMENT_MIN_LENGTH;
  }

  get reviewMaxLength(): number {
    return COMMENT_MAX_LENGTH;
  }

  get canStartReading(): boolean {
    return !!this.form.get('whenToStartReading');
  }

  get whenToStartReading(): WhenToStartReadingSelect[] {
    return WHEN_TO_START_READING;
  }

  constructor(
    private facade: AddBookFacade,
    private fb: FormBuilder,
    private auth: AuthService,
    private eventBus: EventBusService
  ) {}

  search() {
    if (!this.searchKey) {
      this.searchHasError = true;
      return;
    }

    this.searchHasError = false;

    this.facade.addToLastSearches(this.searchKey);
    this.fetchBook(this.searchKey);
  }

  fetchBook(title: string) {
    this.selectedBook$ = this.facade.fetchBook(title);
  }

  private buildForm() {
    this.form = this.fb.group({
      review: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      rating: 1,
      status: Status.ToRead,
      favorite: false,
      whenToStartReading: null
    });
  }

  submit(selectedBook: Book) {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;

    const body: BookBody = {
      id: selectedBook.id,
      uid: this.auth.userId,
      favorite: value.favorite,
      rating: value.rating,
      review: value.review,
      status: value.status,
      whenToStartReading: value.whenToStartReading || null,
    };

    this.facade.submit(body);
  }

  private addControlsByStatus(status: Status) {
    if (status === Status.ToRead) {
      this.form.addControl(
        'whenToStartReading',
        new FormControl(null, Validators.required)
      );
      return;
    }

    this.form.removeControl('whenToStartReading');
  }

  private formReset() {
    this.form.updateValueAndValidity()

    this.submitted = false;

    this.form.get('favorite')?.setValue(false);
    this.form.get('review')?.setValue('');
    this.form.get('rating')?.setValue(1);
    this.form.get('status')?.setValue(Status.ToRead);
    this.form.get('whenToStartReading')?.setValue(null);
  }

  ngOnInit() {
    this.buildForm();
    this.facade.restoreState();

    this.form
      .get('status')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((status) => this.addControlsByStatus(status));

    this.eventBus
      .on(FORM_RESET_EVENT_KEY)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.formReset());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
