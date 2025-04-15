import { Component, CUSTOM_ELEMENTS_SCHEMA, Host, Input } from '@angular/core';
import { Vehicle } from '../../../models/Vehicle';
import { VehiclesService } from '../../../services/vehicles.service';
import { AdvertisementComponent } from '../../pages/advertisement/advertisement.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-advertisement-card',
  imports: [RouterModule],
  templateUrl: './advertisement-card.component.html',
  styleUrl: './advertisement-card.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdvertisementCardComponent {
  @Input() vehicle: Vehicle = new Vehicle();

  constructor(
    private vehicleService: VehiclesService,
    @Host() private advertisement: AdvertisementComponent
  ) {}

  deleteVehicle() {
    this.vehicleService
      .deleteVehicle(this.vehicle.id)
      .subscribe((data: any) => {
        if (data.success) {
          alert('Uspjesno obrisano');
          this.advertisement.ngOnInit();
        }
      });
  }
}
