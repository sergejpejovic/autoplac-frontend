import { Component, Input } from '@angular/core';
import { Vehicle } from '../../../models/Vehicle';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auto-card',
  imports: [RouterModule],
  templateUrl: './auto-card.component.html',
  styleUrl: './auto-card.component.css',
})
export class AutoCardComponent {
  @Input() vehicle: Vehicle = new Vehicle();
}
