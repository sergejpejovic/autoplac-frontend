import { Component, Input } from '@angular/core';
import { Vehicle } from '../../../models/Vehicle';

@Component({
  selector: 'app-auto-card',
  imports: [],
  templateUrl: './auto-card.component.html',
  styleUrl: './auto-card.component.css',
})
export class AutoCardComponent {
  @Input() vehicle: Vehicle = new Vehicle();
}
