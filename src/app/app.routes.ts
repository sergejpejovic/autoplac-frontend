import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AddVehicleComponent } from './components/pages/add-vehicle/add-vehicle.component';
import { AdvertisementComponent } from './components/pages/advertisement/advertisement.component';

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
  },
  {
    path: 'advertisement',
    component: AdvertisementComponent,
  },
];
