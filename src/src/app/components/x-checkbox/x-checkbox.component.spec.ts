import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XCheckboxComponent } from './x-checkbox.component';

describe('XCheckboxComponent', () => {
  let component: XCheckboxComponent;
  let fixture: ComponentFixture<XCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
