import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatingOutResultsContainer } from './eating-out-results.container';

describe('EatingOutResultsContainer', () => {
  let component: EatingOutResultsContainer;
  let fixture: ComponentFixture<EatingOutResultsContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EatingOutResultsContainer]
    });
    fixture = TestBed.createComponent(EatingOutResultsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
