import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-registrarestudiante',
  templateUrl: './registrarestudiante.page.html',
  styleUrls: ['./registrarestudiante.page.scss'],
})
export class RegistrarestudiantePage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}


  async ngOnInit() {
    await this.onRegister();
  }

  async onRegister() {
    try {
      await this.firebaseService.register(this.email, this.password);
      this.router.navigate(['/main/home']);  // Redirige al login tras el registro exitoso
    } catch (error) {
      console.error('Error en el registro:', error);
      // Puedes mostrar un mensaje de error al usuario aquí
    }
  }
}
