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
import { Equipment } from '../../../models/Equipment';
import { EquipmentService } from '../../../services/equipment.service';

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
  equipmentList: Equipment[] = [];
  selectedEquipmentIds: number[] = [];
  fileToUpload: any = null;

  constructor(
    private vehicleService: VehiclesService,
    private additionalsService: AdditionalsService,
    private authService: AuthService,
    private equipmentService: EquipmentService,
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

    this.equipmentService.getAllEquipment().subscribe((data: any) => {
      this.equipmentList = data;
    });

    const user = this.authService.getUserData();
    this.vehicle.userId = user?.userId;
  }

  toggleEquipmentSelection(id: number) {
    const index = this.selectedEquipmentIds.indexOf(id);
    if (index > -1) {
      this.selectedEquipmentIds.splice(index, 1);
    } else {
      this.selectedEquipmentIds.push(id);
    }
  }

  addVehicle(): void {
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
              const vehicleId = data.vehicleId;

              if (this.selectedEquipmentIds.length > 0) {
                this.equipmentService
                  .addEquipmentToVehicle(vehicleId, this.selectedEquipmentIds)
                  .subscribe((equipmentResult: any) => {
                    if (equipmentResult.success) {
                      alert('Vozilo i oprema uspešno dodati');
                      this.router.navigateByUrl('/');
                    } else {
                      alert(
                        'Vozilo dodato, ali nije bilo moguće dodati opremu.'
                      );
                    }
                  });
              } else {
                alert('Vozilo uspešno dodato (bez dodatne opreme)');
                this.router.navigateByUrl('/');
              }
            } else {
              alert('Greška pri dodavanju vozila.');
            }
          });
      });
  }

  setUpUploadedFile(event: any) {
    this.fileToUpload = event.target.files[0];
  }
}
