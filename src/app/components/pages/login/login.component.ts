import { Component, Host } from '@angular/core';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User = new User();

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    return this.authService.login(this.user).subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('autoplac-token', data.token);
        this.router.navigateByUrl('/');
        window.dispatchEvent(new Event('login-status-changed'));
      } else {
        alert('Pogresni podaci!');
      }
    });
  }
}
