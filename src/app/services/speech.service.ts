import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';

import { Speech } from '../models/speech';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SpeechService {

  private speechAddedSource = new Subject<Speech>();
  private speechUrl = 'api/speeches';

  public speechAdded$: Observable<Speech>;

  constructor(private http: HttpClient) {
    this.speechAdded$ = this.speechAddedSource.asObservable();
  }

  getSpeeches(): Observable<Speech[]> {
    return this.http.get<Speech[]>(this.speechUrl)
    .pipe(
      tap((speeches: Speech[]) => console.log(`Fetched speeches `))
    );
  }

  addSpeech (speech: Speech): Observable<Speech> {
    return this.http.post<Speech>(this.speechUrl, speech, httpOptions).pipe(
      tap((speech: Speech) => {
        console.log(`Added speech w/ id=${speech.id}`)
        this.speechAddedSource.next(speech)
    }));
  }

  updateSpeech(speech: Speech): Observable<any> {
    return this.http.put(this.speechUrl, speech, httpOptions).pipe(
      tap(_ => console.log(`Updated speech id=${speech.id}`))
    )
  }

  deleteSpeech (speech: Speech | number): Observable<Speech> {
    const id = typeof speech === 'number' ? speech : speech.id;
    const url = `${this.speechUrl}/${id}`;

    return this.http.delete<Speech>(url, httpOptions).pipe(
      tap(_ => console.log(`Deleted speech id=${id}`))
    );
  }

  searchSpeeches(term: string): Observable<Speech[]> {
    return this.http.get<Speech[]>(this.speechUrl).pipe(
      map(speeches => {
        return speeches.filter(speech => {
          let title = (speech.title || '').toLowerCase();
          let author = (speech.author || '').toLowerCase();
          let keywords = speech.keywords || [];
          term = term.toLowerCase();

          return (title.indexOf(term) !== -1) ||
            (author.indexOf(term) !== -1) ||
            (keywords.includes(term));
        });
      }),
      tap(_ => console.log(`Found speeches matching "${term}"`))
    );
  }
}
