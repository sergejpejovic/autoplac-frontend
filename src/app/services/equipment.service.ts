import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from '../models/Equipment';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(private http: HttpClient) {}

  getAllEquipment() {
    return this.http.get<Equipment[]>('http://localhost:4000/equipment');
  }

  getEquipmentByVehicleId(vehicleId: number) {
    return this.http.get<Equipment[]>(
      `http://localhost:4000/equipment/vehicle/${vehicleId}`
    );
  }

  addEquipmentToVehicle(vehicleId: number, equipmentIds: number[]) {
    return this.http.post(`http://localhost:4000/equipment`, {
      vehicleId,
      equipmentIds,
    });
  }
}
