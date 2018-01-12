import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeReleaseComponent } from './ne-release.component';

describe('NeReleaseComponent', () => {
  let component: NeReleaseComponent;
  let fixture: ComponentFixture<NeReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
