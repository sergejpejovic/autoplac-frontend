import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../../models/Vehicle';
import { VehiclesService } from '../../../services/vehicles.service';
import { AdditionalsService } from '../../../services/additionals.service';
import { BodyType } from '../../../models/BodyType';
import { Brand } from '../../../models/Brand';
import { EngineSize } from '../../../models/EngineSize';
import { Fuel } from '../../../models/Fuel';
import { Model } from '../../../models/Model';
import { Transmission } from '../../../models/Transmission';
import { Type } from '../../../models/Type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css',
})
export class AddVehicleComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  bodyTypes: BodyType[] = [];
  brands: Brand[] = [];
  engineSizes: EngineSize[] = [];
  fuels: Fuel[] = [];
  models: Model[] = [];
  transmissions: Transmission[] = [];
  vehicleTypes: Type[] = [];
  fileToUpload: any = null;

  constructor(
    private vehicleService: VehiclesService,
    private additionalsService: AdditionalsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.additionalsService.getAllBodyTypes().subscribe((data: any) => {
      this.bodyTypes = data;
    });

    this.additionalsService.getAllBrands().subscribe((data: any) => {
      this.brands = data;
    });

    this.additionalsService.getAllEngineSizes().subscribe((data: any) => {
      this.engineSizes = data;
    });

    this.additionalsService.getAllFuels().subscribe((data: any) => {
      this.fuels = data;
    });

    this.additionalsService.getAllModels().subscribe((data: any) => {
      this.models = data;
    });

    this.additionalsService.getAllTransmissions().subscribe((data: any) => {
      this.transmissions = data;
    });

    this.additionalsService.getAllVehicleTypes().subscribe((data: any) => {
      this.vehicleTypes = data;
    });

    const user = this.authService.getUserData();
    this.vehicle.userId = user?.userId;
  }

  addVehicle() {
    const yearOnly = new Date(this.vehicle.year).getFullYear();
    this.vehicle.year = yearOnly;

    const formData: FormData = new FormData();
    formData.append('img', this.fileToUpload);

    this.vehicleService
      .uploadImage(formData)
      .subscribe((fileUploadResponse: any) => {
        this.vehicle.thumbnail = fileUploadResponse.filename;

        this.vehicleService
          .createNewVehicle(this.vehicle)
          .subscribe((data: any) => {
            if (data.success) {
              alert('vozilo dodato');
              this.router.navigateByUrl('/');
            }
          });
      });
  }

  setUpUploadedFile(event: any) {
    this.fileToUpload = event.target.files[0];
  }
}
