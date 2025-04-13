import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../models/Vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  getAllVehicles() {
    return this.http.get<Vehicle[]>('http://localhost:4000/vehicles');
  }

  getVehicleById(id: number) {
    return this.http.get<Vehicle>(`http://localhost:4000/vehicle/${id}`);
  }

  createNewVehicle(vehicle: Vehicle) {
    return this.http.post(`http://localhost:4000/vehicles`, vehicle);
  }
}
