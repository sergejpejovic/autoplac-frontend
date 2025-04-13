import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../../models/Vehicle';
import { VehiclesService } from '../../../services/vehicles.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AdvertisementCardComponent } from '../../helpers/advertisement-card/advertisement-card.component';

@Component({
  selector: 'app-advertisement',
  imports: [CommonModule, AdvertisementCardComponent],
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.css',
})
export class AdvertisementComponent implements OnInit {
  vehicles: Vehicle[] = [];
  userId: number = null;

  constructor(
    private vehiclesService: VehiclesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserData().userId;
    console.log(this.userId);
    this.vehiclesService
      .getVehiclesByUserId(this.userId)
      .subscribe((data: any) => {
        this.vehicles = data;
        console.log(this.vehicles);
      });
  }
}
