import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '.';
import { BookBody, BookWithDocId } from '../content/models';

@Injectable({
  providedIn: 'root',
})
export class FireApiService {
  constructor(private store: AngularFirestore, private auth: AuthService) {}

  addBook(body: BookBody) {
    return from(this.store.collection('content').add(body));
  }

  getBooks(): Observable<BookWithDocId[]> {
    return this.store
      .collection<BookBody>('content', (ref) =>
        ref.where('uid', '==', this.auth.userId)
      )
      .get()
      .pipe(
        map<DocumentData, BookWithDocId[]>((res) =>
          res.docs.map((d: DocumentData) => ({ ...d.data(), docId: d.id }))
        )
      );
  }

  getBook(docId: string): Observable<BookBody | undefined> {
    return this.store
      .collection<BookBody>('content', (ref) =>
        ref.where('uid', '==', this.auth.userId)
      )
      .doc(docId)
      .get()
      .pipe(map<DocumentData, BookBody>((res) => res.data()));
  }

  removeBook(docId: string): Observable<void> {
    return from(
      this.store
        .collection<BookBody>('content', (ref) =>
          ref.where('uid', '==', this.auth.userId)
        )
        .doc(docId)
        .delete()
    );
  }
}
