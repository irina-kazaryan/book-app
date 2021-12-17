// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  booksApiBase: 'https://www.googleapis.com/books/v1/volumes',
  movieApiBase: 'http://www.omdbapi.com/?apikey=1b4612ec',
  firebaseConfig : {
    apiKey: "AIzaSyDox9BxWoPLVAIxk6qL22W37vYVBVGqTKg",
    authDomain: "book-project-1e63f.firebaseapp.com",
    projectId: "book-project-1e63f",
    storageBucket: "book-project-1e63f.appspot.com",
    messagingSenderId: "808769006529",
    appId: "1:808769006529:web:9656ff6ca350ad138d5d40"
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
