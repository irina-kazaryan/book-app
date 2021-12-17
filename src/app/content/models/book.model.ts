import { Status, WhenToStartReading } from '../content.model';
import { Movie } from './movie.model';

export interface Book {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  categories: string[];
  imageUrl: string;
  language: string;
  movie: Movie;
}

export interface BookResult {
  items: [
    {
      id: string;
      volumeInfo: {
        title: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        categories: string[];
        imageLinks: {
          smallThumbnail: string;
          thumbnail: string;
        };
        language: string;
      };
    }
  ];
}

export interface BookItemResult {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    categories: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small: string;
      medium: string;
    };
    language: string;
  };
}

export interface BookBody {
  id: string;
  uid: string | null | undefined;
  favorite: boolean;
  review: string;
  rating: number;
  status: Status;
  whenToStartReading?: WhenToStartReading | null | undefined;
}

export type BookWithDocId = BookBody & { docId: string };

export interface BookListItem {
  data: BookWithDocId;
  book: BookItemResult;
}
