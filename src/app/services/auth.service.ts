import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post('http://localhost:4000/auth/login', user);
  }

  register(user: User) {
    return this.http.post('http://localhost:4000/auth/register', user);
  }

  isLoggedIn() {
    const token = localStorage.getItem('autoplac-token');
    if (token) return true;
    return false;
  }

  getUserData() {
    const token = localStorage.getItem('autoplac-token');
    if (!token) return null;
    const tokenParts = token.split('.');
    const userDataPart = tokenParts[1];
    const user = JSON.parse(window.atob(userDataPart));
    return user;
  }
}
