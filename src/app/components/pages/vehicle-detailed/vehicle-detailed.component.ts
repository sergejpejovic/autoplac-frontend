import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Vehicle } from '../../../models/Vehicle';
import { VehiclesService } from '../../../services/vehicles.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/User';
import { UserCardComponent } from '../../helpers/user-card/user-card.component';
import { EquipmentService } from '../../../services/equipment.service';
import { Equipment } from '../../../models/Equipment';

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
  equipment: Equipment[] = [];

  constructor(
    private vehicleService: VehiclesService,
    private equipmentService: EquipmentService,
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

        this.equipmentService
          .getEquipmentByVehicleId(vehicleId)
          .subscribe((data: any) => {
            this.equipment = data;
          });
      }
    });
  }
}
