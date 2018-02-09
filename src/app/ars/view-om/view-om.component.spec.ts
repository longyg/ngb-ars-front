import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOmComponent } from './view-om.component';

describe('ViewOmComponent', () => {
  let component: ViewOmComponent;
  let fixture: ComponentFixture<ViewOmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
