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
    return this.http.get<Vehicle>(`http://localhost:4000/vehicles/${id}`);
  }

  getVehiclesByUserId(userId: number) {
    return this.http.get<Vehicle[]>(
      `http://localhost:4000/vehicles/user/${userId}`
    );
  }

  getUserByVehicleId(vehicleId: number) {
    return this.http.get<Vehicle>(
      `http://localhost:4000/vehicles/user/vehicle/${vehicleId}`
    );
  }

  createNewVehicle(vehicle: Vehicle) {
    return this.http.post(`http://localhost:4000/vehicles`, vehicle);
  }

  updateVehicle(vehicle: Vehicle) {
    return this.http.put(
      `http://localhost:4000/vehicles/${vehicle.id}`,
      vehicle
    );
  }

  deleteVehicle(id: number) {
    return this.http.delete(`http://localhost:4000/vehicles/${id}`);
  }

  uploadImage(formData: FormData) {
    return this.http.post('http://localhost:4000/upload', formData);
  }
}
