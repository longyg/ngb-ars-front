import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReleaseConfigComponent } from './add-release-config.component';

describe('AddReleaseConfigComponent', () => {
  let component: AddReleaseConfigComponent;
  let fixture: ComponentFixture<AddReleaseConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReleaseConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReleaseConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
