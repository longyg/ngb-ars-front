import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseConfigComponent } from './release-config.component';

describe('ReleaseConfigComponent', () => {
  let component: ReleaseConfigComponent;
  let fixture: ComponentFixture<ReleaseConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
