import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { SelectComponent } from 'ng2-select';
import { NgForm } from '@angular/forms';

import { SpeechService } from '../services/speech.service';
import { Speech } from '../models/speech';

@Component({
  selector: 'app-speech-editor',
  templateUrl: './speech-editor.component.html',
  styleUrls: ['./speech-editor.component.css']
})

export class SpeechEditorComponent implements OnChanges {

  keyword: string;
  actionMsg: string;
  alertTitle: string;
  showAlert: boolean = false;
  isBtnSaveDisabled: boolean = false;

  @Input() speech: Speech;
  @ViewChild('form') form: NgForm;
  @ViewChild('select') select: SelectComponent;

  constructor(private speechService: SpeechService) {}

  ngOnChanges() {
    this.showAlert = false;
    this.clearKeywords();
    if (this.speech) this.speech.date = new Date(this.speech.date);
  }

  getSpeechEditorHeader(): string {
    let speech = this.speech;
    if (speech && speech.title) return `${speech.title} Details`;
    return 'New Speech Details';
  }

  storedKeyword(keyword: string): void {
    this.keyword = keyword;
  }

  addKeyword(): void {
    let keyword = this.keyword;
    let keywords = this.select.active.map(keyword => keyword.text);

    if (keyword && !keywords.includes(keyword)) {
      this.select.active.push({ text: keyword, id: keyword });
      this.clearKeywords();
    }
  }

  onSubmit(values: any): void {
    let updateSpeechData = () => {
      Object.assign(this.speech, values);
      this.speech.keywords = this.select.active.map(active => active.text);
    };

    this.isBtnSaveDisabled = true;
    if (!this.speech.id) {
      // Adds new speech
      this.speech.id = new Date().valueOf();
      this.speech.title = `Speech ${this.speech.id}`;
      updateSpeechData();
      this.speechService.addSpeech(this.speech).subscribe(() => {
        this.displayAlert(this.speech.title, 'added');
        this.speech = new Speech();
      });
    } else {
      // Updates existing speech
      this.speechService.updateSpeech(this.speech).subscribe(() => {
        updateSpeechData();
        this.displayAlert(this.speech.title, 'updated');
      });
    }
  }

  onAlertClosed(): void {
    this.showAlert = false;
  }

  private clearKeywords(): void {
    let el = this.select.element.nativeElement.querySelector('.ui-select-search');
    if (el) el.value = '';
  }

  private displayAlert(title: string, action: string): void {
    this.showAlert = true;
    this.alertTitle = title;
    this.actionMsg = action;
    this.isBtnSaveDisabled = false;
  }
}
