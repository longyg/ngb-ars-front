import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectLoadComponent } from './object-load.component';

describe('ObjectLoadComponent', () => {
  let component: ObjectLoadComponent;
  let fixture: ComponentFixture<ObjectLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
