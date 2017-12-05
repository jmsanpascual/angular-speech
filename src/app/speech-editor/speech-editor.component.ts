import { Component, Input, ViewChild } from '@angular/core';
import { SelectComponent } from 'ng2-select';
import { NgForm } from '@angular/forms';

import { SpeechService } from '../services/speech.service';
import { Speech } from '../models/speech';

@Component({
  selector: 'app-speech-editor',
  templateUrl: './speech-editor.component.html',
  styleUrls: ['./speech-editor.component.css']
})

export class SpeechEditorComponent {

  keyword: string;

  @Input() speech: Speech;
  @ViewChild('form') form: NgForm;
  @ViewChild('select') select: SelectComponent;

  constructor(private speechService: SpeechService) {}

  storedKeyword(keyword: string): void {
    this.keyword = keyword;
  }

  addKeyword(): void {
    let keyword = this.keyword;
    let keywords = this.speech.keywords;

    if (keyword && !keywords.includes(keyword)) {
      this.select.active.push({ text: keyword, id: keyword });
      this.select.element.nativeElement.querySelector('.ui-select-search').value = '';
    }
  }

  onSubmit(values: any): void {
    this.speechService.updateSpeech(this.speech).subscribe(() => {
      Object.assign(this.speech, values);
      this.speech.keywords = this.select.active.map(active => active.text);
    });
  }
}
