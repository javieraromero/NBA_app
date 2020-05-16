import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallStandingsComponent } from './overall-standings.component';

describe('OverallStandingsComponent', () => {
  let component: OverallStandingsComponent;
  let fixture: ComponentFixture<OverallStandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallStandingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
