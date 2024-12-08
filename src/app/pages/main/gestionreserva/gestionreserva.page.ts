import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-gestionreserva',
  templateUrl: './gestionreserva.page.html',
  styleUrls: ['./gestionreserva.page.scss'],
})
export class GestionreservaPage implements OnInit {
  slots: any[] = [];
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(private firebaseService: FirebaseService) { }

  async ngOnInit() {
    const loading = await this.utilsSvc.loading();
    await loading.present();
    this.firebaseSvc.getSlots().subscribe(slots => {
      this.slots = slots.map(slot => ({
        uid: slot.payload.doc.id,
        ...slot.payload.doc.data()
      }));
      loading.dismiss();
    }, error => {
      loading.dismiss();
      console.error('Error al obtener las salas reservadas ', error);
    });
  }

  releaseSlot(uid: string) {
    return this.firebaseSvc.updateSlotStatus(uid, false).then(() => {
      const slot = this.slots.find(slot => slot.uid === uid);
      if (slot) {
        slot.disabled = false;
      }
    });
  }

  clearSlot(uid: string) {
    return this.firebaseSvc.deleteSubCollection(uid).then(() => {
      this.slots = this.slots.filter(slot => slot.uid !== uid);
    });
  }

  cancelarReservas(sala: string) {
    return this.firebaseService.updatecancelReservationStatus(sala)
      .subscribe(() => {
        this.slots = this.slots.filter(slot => slot.sala !== sala);
      });
  }
}
