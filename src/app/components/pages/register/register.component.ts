import { Component } from '@angular/core';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: User = new User();

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (
      !this.user.username ||
      !this.user.email ||
      !this.user.hashedPassword ||
      !this.user.confirmPassword
    ) {
      alert('Unesite sve podatke!');
      return;
    }

    if (this.user.hashedPassword !== this.user.confirmPassword) {
      alert('Lozinke se ne poklapaju!');
      return;
    }

    this.authService.register(this.user).subscribe((data: any) => {
      if (data.success) {
        alert('Uspjesna registracija!');
        localStorage.setItem('autoplac-token', data.token);
        this.router.navigateByUrl('/login');
      } else {
        alert('Neuspjesna registracija');
      }
    });
  }
}
