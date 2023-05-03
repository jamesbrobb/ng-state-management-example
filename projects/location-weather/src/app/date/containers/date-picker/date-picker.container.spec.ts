import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerContainer } from './date-picker.container';

describe('DatePickerContainer', () => {
  let component: DatePickerContainer;
  let fixture: ComponentFixture<DatePickerContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DatePickerContainer]
    });
    fixture = TestBed.createComponent(DatePickerContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
