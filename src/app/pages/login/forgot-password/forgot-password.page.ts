import { Component } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';
  message: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  async sendResetLink() {
    try {
      await this.firebaseService.resetPassword(this.email);
      this.message = 'Se ha enviado un enlace de recuperación a tu correo.';
  
      this.email = '';
  
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 0);
    } catch (error) {
      this.message = 'Error al enviar el enlace de recuperación. Inténtalo de nuevo.';
      console.error('Error en el envío del enlace de recuperación:', error);
    }
  }
  
}
