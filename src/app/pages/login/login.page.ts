import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  async submit() {
    try {
      await this.firebaseService.login(this.email, this.password);
      this.router.navigate(['../main/home']);
    } catch (error) {
      console.error('Error en el login:', error);
    }
  }
}