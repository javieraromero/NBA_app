import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStarComponent } from './all-star.component';

describe('AllStarComponent', () => {
  let component: AllStarComponent;
  let fixture: ComponentFixture<AllStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
