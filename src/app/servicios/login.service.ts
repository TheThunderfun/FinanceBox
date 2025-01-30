import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private authService: AuthService) {}

  login(email: string, password: string) {
    this.authService.signIn(email, password);
  }

  signup(email: string, password: string) {
    this.authService.signUp(email, password);
  }
}
