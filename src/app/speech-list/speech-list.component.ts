import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { SpeechService } from '../services/speech.service';
import { Speech } from '../models/speech';

@Component({
  selector: 'app-speech-list',
  templateUrl: './speech-list.component.html',
  styleUrls: ['./speech-list.component.css']
})

export class SpeechListComponent implements OnInit {

  @Input() speeches: Speech[];
  @Output() onSelected = new EventEmitter<Speech>();

  constructor(private speechService: SpeechService) {}

  ngOnInit() {
    this.getSpeeches();
  }

  getSpeeches(): void {
    this.speechService.getSpeeches().subscribe(speeches => {
      this.speeches = speeches;
      this.onSelected.emit(speeches[0]);
    });
  }

  select(speech: Speech): void {
    this.onSelected.emit(speech);
  }

}
