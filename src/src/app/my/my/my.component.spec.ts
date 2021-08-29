import { NotificationService } from './../../core/services/notification.service';
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MyComponent } from "./my.component";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material";
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe("MyComponent", () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule, ReactiveFormsModule, MatSnackBarModule],
      declarations: [MyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
