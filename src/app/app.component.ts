import { Component } from '@angular/core';

import { Speech } from './models/speech';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Speech App';
  speech: Speech = new Speech();

  onSpeechSelected(speech: any): void {
    this.speech = speech;
  }

}
