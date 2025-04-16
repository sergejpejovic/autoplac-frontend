import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Vehicle } from '../../../models/Vehicle';
import { VehiclesService } from '../../../services/vehicles.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/User';
import { UserCardComponent } from '../../helpers/user-card/user-card.component';

@Component({
  selector: 'app-vehicle-detailed',
  imports: [CommonModule, UserCardComponent],
  templateUrl: './vehicle-detailed.component.html',
  styleUrl: './vehicle-detailed.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VehicleDetailedComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  user: User = new User();

  constructor(
    private vehicleService: VehiclesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsData) => {
      if (paramsData['id']) {
        const vehicleId = paramsData['id'];

        this.vehicleService.getVehicleById(vehicleId).subscribe((data: any) => {
          this.vehicle = data;
        });

        this.vehicleService
          .getUserByVehicleId(vehicleId)
          .subscribe((data: any) => {
            this.user = data[0];
          });
      }
    });
  }
}
