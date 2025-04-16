import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AddVehicleComponent } from './components/pages/add-vehicle/add-vehicle.component';
import { AdvertisementComponent } from './components/pages/advertisement/advertisement.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { EditVehicleComponent } from './components/pages/edit-vehicle/edit-vehicle.component';
import { VehicleDetailedComponent } from './components/pages/vehicle-detailed/vehicle-detailed.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'add-vehicle',
    component: AddVehicleComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-vehicle/:id',
    component: EditVehicleComponent,
    canActivate: [authGuard],
  },
  {
    path: 'advertisement',
    component: AdvertisementComponent,
    canActivate: [authGuard],
  },
  {
    path: 'vehicle-detailed/:id',
    component: VehicleDetailedComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];
