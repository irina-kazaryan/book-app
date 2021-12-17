import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieResult } from '../models';

@Injectable()
export class MovieApiService {
  constructor(private http: HttpClient) {}

  getMovieByName(title: string) {
    return this.http.get<MovieResult>(`${environment.movieApiBase}&t=${title}`);
  }

  getMovieByImdbId(imdbId: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(
      `${environment.movieApiBase}&i=${imdbId}`
    );
  }
}
