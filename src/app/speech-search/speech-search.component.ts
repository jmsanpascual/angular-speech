import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';

import { Speech } from '../models/speech';
import { SpeechService } from '../services/speech.service';


@Component({
  selector: 'app-speech-search',
  templateUrl: './speech-search.component.html',
  styleUrls: ['./speech-search.component.css']
})

export class SpeechSearchComponent implements OnInit {

  isSearching: boolean = false;
  speeches$: Observable<Speech[]>;
  private searchTerms = new Subject<string>();
  @Output() onSearch = new EventEmitter<Speech[]>();
  @Output() onNewSpeech = new EventEmitter();

  constructor(private speechService: SpeechService) {}

  ngOnInit(): void {
    this.speeches$ = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(_ => this.isSearching = true),
      switchMap((term: string) =>  this.speechService.searchSpeeches(term))
    );

    this.speeches$.subscribe(speeches => {
      this.isSearching = false;
      this.onSearch.emit(speeches);
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  newSpeech(): void {
    this.onNewSpeech.emit();
  }

}
