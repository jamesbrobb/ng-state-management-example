import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputContainer } from './search-input.container';

describe('SearchInputContainer', () => {
  let component: SearchInputContainer;
  let fixture: ComponentFixture<SearchInputContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchInputContainer]
    });
    fixture = TestBed.createComponent(SearchInputContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
