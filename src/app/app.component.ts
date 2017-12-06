import { Component, ViewChild } from '@angular/core';
import { SpeechListComponent } from './speech-list/speech-list.component';

import { Speech } from './models/speech';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  speech: Speech;
  @ViewChild('speechList') speechList: SpeechListComponent;

  newSpeechForm(): void {
    let tabs = this.speechList.tabSet.tabs;
    tabs.map((tab) => tab.active = false);
    this.newSpeechInstance();
  }

  onSpeechSelected(speech: Speech): void {
    this.speech = speech;
  }

  onSpeechDeleted(speechId: number): void {
    if (this.speech.id == speechId) {
      this.newSpeechInstance();
    }
  }

  private newSpeechInstance(): void {
    this.speech = new Speech();
    this.speech.date = new Date();
  }

}
