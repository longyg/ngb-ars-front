import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPmComponent } from './view-pm.component';

describe('ViewPmComponent', () => {
  let component: ViewPmComponent;
  let fixture: ComponentFixture<ViewPmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
