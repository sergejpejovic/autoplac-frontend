import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn() ?? false;
    window.addEventListener('login-status-changed', () => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
