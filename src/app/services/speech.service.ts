import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';

import { Speech } from '../models/speech';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SpeechService {

  private speechUrl = 'api/speeches';

  constructor(private http: HttpClient) { }

  getSpeeches(): Observable<Speech[]> {
    return this.http.get<Speech[]>(this.speechUrl)
    .pipe(
      tap((speeches: Speech[]) => {
        console.log(`Fetched speeches `);
        return speeches.map(speech => speech.date = new Date(speech.date));
      })
    );
  }

  addSpeech (speech: Speech): Observable<Speech> {
    return this.http.post<Speech>(this.speechUrl, speech, httpOptions).pipe(
      tap((speech: Speech) => console.log(`Added speech w/ id=${speech.id}`))
    );
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
    if (!term.trim()) {
      // If not search term, return empty speech array.
      return of([]);
    }

    return this.http.get<Speech[]>(`api/speeches/?name=${term}`).pipe(
      tap(_ => console.log(`Found speeches matching "${term}"`))
    );
  }
}
