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

  ngOnInit(): void {
    this.isLoggedIn = this.isUserLoggedIn();
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('autoplac-token');
    return token ? true : false;
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
