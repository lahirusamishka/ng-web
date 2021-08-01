import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTableComponent } from './x-table.component';

describe('XTableComponent', () => {
  let component: XTableComponent;
  let fixture: ComponentFixture<XTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
