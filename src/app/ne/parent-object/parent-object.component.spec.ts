import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentObjectComponent } from './parent-object.component';

describe('ParentObjectComponent', () => {
  let component: ParentObjectComponent;
  let fixture: ComponentFixture<ParentObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
