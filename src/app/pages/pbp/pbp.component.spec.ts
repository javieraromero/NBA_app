import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbpComponent } from './pbp.component';

describe('PbpComponent', () => {
  let component: PbpComponent;
  let fixture: ComponentFixture<PbpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
