import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services';
import { EventBusService } from 'src/app/services/event-bus.service';
import { FireApiService } from 'src/app/services/fire-api.service';
import { FORM_RESET_EVENT_KEY } from '../content.model';
import {
  Book,
  BookBody,
  Movie,
  MovieResult,
} from '../models';
import {
  BookApiService,
  MovieApiService,
} from '../services';
import { AddBookStorage } from './add-book.storage';

@Injectable()
export class AddBookFacade {
  get lastThreeSearches(): string[] {
    return this.storage.lastThreeSearches;
  }

  constructor(
    private movieApiService: MovieApiService,
    private bookApiService: BookApiService,
    private loadingService: LoadingService,
    private storage: AddBookStorage,
    private fireApiService: FireApiService,
    private eventBus: EventBusService,
    private router: Router
  ) {}

  private mapMovie(movie: MovieResult): Movie {
    return {
      imdbID: movie.imdbID,
      posterUrl: movie.Poster,
      title: movie.Title,
      actors: movie.Actors,
      director: movie.Director,
      genre: movie.Genre,
      year: movie.Year
    };
  }

  private getMovie(movieTitle: string) {
    return this.movieApiService
      .getMovieByName(movieTitle)
      .pipe(map<MovieResult, Movie>((m) => this.mapMovie(m)));
  }

  fetchMovie(title: string) {
    this.loadingService.start();
    return this.movieApiService.getMovieByName(title).pipe(
      map<MovieResult, Movie>((movie)=> this.mapMovie(movie)),
      finalize(() => {
        this.loadingService.stop();
        this.eventBus.emit(FORM_RESET_EVENT_KEY);
      })
    );
  }

  fetchBook(title: string) {
    this.loadingService.start();
    return this.bookApiService.getBookByTitle(title).pipe(
      switchMap((book) => {
        return this.getMovie(title).pipe(
          map<Movie, Book>((movie) => ({
            movie,
            id: book.items[0].id,
            title: book.items[0].volumeInfo.title,
            authors: book.items[0].volumeInfo.authors,
            description: book.items[0].volumeInfo.description,
            publisher: book.items[0].volumeInfo.publisher,
            publishedDate: book.items[0].volumeInfo.publishedDate,
            categories: book.items[0].volumeInfo.categories,
            imageUrl: book.items[0].volumeInfo.imageLinks.thumbnail,
            language: book.items[0].volumeInfo.language,
          }))
        );
      }),
      catchError(()=> {return of<Book>()}),
      finalize(() => {
        this.loadingService.stop();
        this.eventBus.emit(FORM_RESET_EVENT_KEY);
      })
    );
  }

  addToLastSearches(key: string) {
    this.storage.addToLastSearches(key);
  }

  restoreState() {
    this.storage.restoreState();
  }

  submit(body: BookBody) {
    this.fireApiService.addBook(body).subscribe(()=>this.router.navigate(['content']));
  }
}
