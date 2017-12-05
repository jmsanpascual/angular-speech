import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechEditorComponent } from './speech-editor.component';

describe('SpeechEditorComponent', () => {
  let component: SpeechEditorComponent;
  let fixture: ComponentFixture<SpeechEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
