import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarestudiantePageRoutingModule } from './registrarestudiante-routing.module';

import { RegistrarestudiantePage } from './registrarestudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarestudiantePageRoutingModule
  ],
  declarations: [RegistrarestudiantePage]
})
export class RegistrarestudiantePageModule {}
