import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Type } from '../models/Type';
import { Brand } from '../models/Brand';
import { Fuel } from '../models/Fuel';
import { Transmission } from '../models/Transmission';
import { BodyType } from '../models/BodyType';
import { EngineSize } from '../models/EngineSize';
import { Model } from '../models/Model';

@Injectable({
  providedIn: 'root',
})
export class AdditionalsService {
  constructor(private http: HttpClient) {}

  getAllVehicleTypes() {
    return this.http.get<Type[]>(
      'http://localhost:4000/additionals/vehicleTypes'
    );
  }

  getAllBrands() {
    return this.http.get<Brand[]>('http://localhost:4000/additionals/brands');
  }

  getAllFuels() {
    return this.http.get<Fuel[]>('http://localhost:4000/additionals/fuels');
  }

  getAllModels() {
    return this.http.get<Model[]>('http://localhost:4000/additionals/models');
  }

  getAllTransmissions() {
    return this.http.get<Transmission[]>(
      'http://localhost:4000/additionals/transmissions'
    );
  }

  getAllBodyTypes() {
    return this.http.get<BodyType[]>(
      'http://localhost:4000/additionals/bodyTypes'
    );
  }

  getAllEngineSizes() {
    return this.http.get<EngineSize[]>(
      'http://localhost:4000/additionals/engineSizes'
    );
  }
}
