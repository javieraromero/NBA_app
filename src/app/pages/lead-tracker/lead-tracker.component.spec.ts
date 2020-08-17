import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadTrackerComponent } from './lead-tracker.component';

describe('LeadTrackerComponent', () => {
  let component: LeadTrackerComponent;
  let fixture: ComponentFixture<LeadTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
