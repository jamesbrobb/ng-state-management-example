import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetailsContainer } from './location-details.container';

describe('LocationDetailsContainer', () => {
  let component: LocationDetailsContainer;
  let fixture: ComponentFixture<LocationDetailsContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LocationDetailsContainer]
    });
    fixture = TestBed.createComponent(LocationDetailsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
