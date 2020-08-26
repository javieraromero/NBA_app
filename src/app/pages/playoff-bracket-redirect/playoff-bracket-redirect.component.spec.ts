import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffBracketRedirectComponent } from './playoff-bracket-redirect.component';

describe('PlayoffBracketRedirectComponent', () => {
  let component: PlayoffBracketRedirectComponent;
  let fixture: ComponentFixture<PlayoffBracketRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayoffBracketRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayoffBracketRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
