import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherResultsContainer } from './weather-results.container';

describe('WeatherResultsContainer', () => {
  let component: WeatherResultsContainer;
  let fixture: ComponentFixture<WeatherResultsContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeatherResultsContainer]
    });
    fixture = TestBed.createComponent(WeatherResultsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
