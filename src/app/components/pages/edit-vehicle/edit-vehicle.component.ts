import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../../services/vehicles.service';
import { Vehicle } from '../../../models/Vehicle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Type } from '../../../models/Type';
import { Transmission } from '../../../models/Transmission';
import { Model } from '../../../models/Model';
import { Brand } from '../../../models/Brand';
import { EngineSize } from '../../../models/EngineSize';
import { Fuel } from '../../../models/Fuel';
import { BodyType } from '../../../models/BodyType';
import { AdditionalsService } from '../../../services/additionals.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-vehicle',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.css',
})
export class EditVehicleComponent implements OnInit {
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
    private activatedRoute: ActivatedRoute,
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

    this.activatedRoute.params.subscribe((paramsData) => {
      if (paramsData['id']) {
        const vehicleId = paramsData['id'];

        this.vehicleService.getVehicleById(vehicleId).subscribe((data: any) => {
          this.vehicle = data;
        });
      }
    });
  }

  updateVehicle() {
    const yearOnly = new Date(this.vehicle.year).getFullYear();
    this.vehicle.year = yearOnly;

    const formData: FormData = new FormData();
    formData.append('img', this.fileToUpload);

    this.vehicleService
      .uploadImage(formData)
      .subscribe((fileUploadResponse: any) => {
        this.vehicle.thumbnail = fileUploadResponse.filename;

        this.vehicleService
          .updateVehicle(this.vehicle)
          .subscribe((data: any) => {
            if (data.success) {
              this.router.navigateByUrl('/advertisement');
            }
          });
      });
  }

  setUpUploadedFile(event: any) {
    this.fileToUpload = event.target.files[0];
  }
}
