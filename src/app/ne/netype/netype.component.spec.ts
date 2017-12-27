import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetypeComponent } from './netype.component';

describe('NetypeComponent', () => {
  let component: NetypeComponent;
  let fixture: ComponentFixture<NetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
