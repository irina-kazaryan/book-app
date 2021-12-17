export interface MovieResult {
  imdbID: string;
  Title: string;
  Year: string;
  Director: string;
  Actors: string;
  Genre: string;
  Poster: string;
}

export interface Movie {
  imdbID: string;
  title: string;
  posterUrl: string;
  year: string;
  director: string;
  actors: string;
  genre: string;
}