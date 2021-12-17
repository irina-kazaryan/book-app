import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookItemResult, BookResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  constructor(private http: HttpClient) {}

  getBookByTitle(title: string) {
    return this.http.get<BookResult>(
      `${environment.booksApiBase}?q=intitle:"${title}"&printType=books&maxResults=1&key=AIzaSyBeQZL8o4mDq6zsGAn3w9GPhwZs3C6MMDw`
    );
  }

  getBookById(id: string): Observable<BookItemResult> {
    return this.http.get<BookItemResult>(`${environment.booksApiBase}/${id}`);
  }
}
