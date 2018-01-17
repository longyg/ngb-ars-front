import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptationComponent } from './adaptation.component';

describe('AdaptationComponent', () => {
  let component: AdaptationComponent;
  let fixture: ComponentFixture<AdaptationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
