import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { SelectModule } from "ng2-select";
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';

import { SpeechService } from './services/speech.service';

import { AppComponent } from './app.component';
import { SpeechEditorComponent } from './speech-editor/speech-editor.component';
import { SpeechListComponent } from './speech-list/speech-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeechEditorComponent,
    SpeechListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    SelectModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [SpeechService],
  bootstrap: [AppComponent]
})
export class AppModule { }
