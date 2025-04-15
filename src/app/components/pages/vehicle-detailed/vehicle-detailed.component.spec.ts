import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailedComponent } from './vehicle-detailed.component';

describe('VehicleDetailedComponent', () => {
  let component: VehicleDetailedComponent;
  let fixture: ComponentFixture<VehicleDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleDetailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
