import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../../models/Vehicle';
import { VehiclesService } from '../../../services/vehicles.service';
import { AutoCardComponent } from '../../helpers/auto-card/auto-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AutoCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehiclesService) {}

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe((data: any) => {
      this.vehicles = data;
    });
  }
}
