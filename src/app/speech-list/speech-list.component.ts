import { Component, EventEmitter, Input, Output, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { SpeechService } from '../services/speech.service';
import { Speech } from '../models/speech';

@Component({
  selector: 'app-speech-list',
  templateUrl: './speech-list.component.html',
  styleUrls: ['./speech-list.component.css']
})

export class SpeechListComponent implements OnInit {

  speechId: number;
  modalRef: BsModalRef;
  @Input() speeches: Speech[];
  @Output() onSelected = new EventEmitter<Speech>();
  @Output() onDeleted = new EventEmitter<number>();
  @Output() onNewSpeech = new EventEmitter();
  @ViewChild('tabs') tabSet: TabsetComponent;

  constructor(
    private speechService: SpeechService,
    private modalService: BsModalService) {
      speechService.speechAdded$.subscribe((speech) => {
        let idx = this.speeches.push(speech);
      });
  }

  ngOnInit() {
    this.getSpeeches();
  }

  trackById(speech: Speech): number {
    return speech.id;
  }

  onSpeechSearch(speeches: Speech[]): void {
    this.speeches = speeches;
    this.onSelected.emit(this.speeches[0]);
    let tabs = this.tabSet.tabs;
    setTimeout(() => {
      if (tabs[0]) tabs[0].active = true;
    });
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

  newSpeech(): void {
    this.onNewSpeech.emit();
  }

  deleteSpeech(speech: Speech, template: TemplateRef<any>): void {
    this.speechId = speech.id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmDelete(): void {
    this.speechService.deleteSpeech(this.speechId).subscribe(_ => {
      this.modalRef.hide();
      this.speeches = this.speeches.filter(speech => speech.id !== this.speechId);
      this.onDeleted.emit(this.speechId);
      this.tabSet.tabs.map((tab) => tab.active = false);
    });
  }

  declineDelete(): void {
    this.modalRef.hide();
  }
}
