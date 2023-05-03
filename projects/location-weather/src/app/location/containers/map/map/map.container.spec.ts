import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapContainer } from './map.container';

describe('MapContainer', () => {
  let component: MapContainer;
  let fixture: ComponentFixture<MapContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MapContainer]
    });
    fixture = TestBed.createComponent(MapContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
