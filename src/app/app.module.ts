import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { SelectModule } from "ng2-select";
import { AlertModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';

import { SpeechService } from './services/speech.service';

import { AppComponent } from './app.component';
import { SpeechEditorComponent } from './speech-editor/speech-editor.component';
import { SpeechListComponent } from './speech-list/speech-list.component';
import { SpeechSearchComponent } from './speech-search/speech-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeechEditorComponent,
    SpeechListComponent,
    SpeechSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    SelectModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [SpeechService],
  bootstrap: [AppComponent]
})
export class AppModule { }
