import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../model/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { setDoc, getDoc, doc, updateDoc, collection, getDocs, query, where, orderBy } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { Observable, catchError, from, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private afAuth: AngularFireAuth) {}

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  // =============ACCEDER

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
  
  async login(email: string, password: string): Promise<any> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }


  //=========RESTABLECER CONTRASEÑA=========
  async resetPassword(email: string): Promise<void> {
    return await this.afAuth.sendPasswordResetEmail(email);
  }
  
  // BD
  setDocument(path: string, data: any) {
    return setDoc(doc(this.firestore.firestore, path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(this.firestore.firestore, path))).data();
  }

  //==================CERRAR SESION========
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/login');
  }

  // Método para actualizar un documento en Firestore
  async updateDocument(collection: string, docId: string, newData: any) {
    try {
      const docRef = doc(this.firestore.firestore, collection, docId);
      await updateDoc(docRef, newData);
      console.log('Documento actualizado exitosamente en Firestore');
    } catch (error) {
      console.error('Error al actualizar documento en Firestore:', error);
      throw error;
    }
  }

  // =========== Obtener los reportes =============
  async getAllReservations() {
    const q = query(
      collection(this.firestore.firestore, 'reservations'),
      orderBy('sala', 'asc') // Ordenar por fecha en orden ascendente
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }

  // =========== Obtener datos de salas ==============
  getSalasMantenimiento(): Observable<any[]> {
    return this.firestore.collection('mantenimiento').valueChanges({ idField: 'id' });
  }

  getSalaById(id: string): Observable<any> {
    return this.firestore.collection('mantenimiento').doc(id).valueChanges();
  }

  // ================== Gestion reservadas ======================
  getSlots(): Observable<any[]> {
    return this.firestore.collection('disabledSlots').snapshotChanges();
  }

  deleteSlot(uid: string): Promise<void> {
    return this.firestore.collection('disabledSlots').doc(uid).delete();
  }

  updateSlotStatus(uid: string, status: boolean): Promise<void> {
    return this.firestore.collection('disabledSlots').doc(uid).update({ disabled: status });
  }

  deleteSubCollection(uid: string): Promise<void> {
    return this.firestore.collection('disabledSlots').doc(uid).delete();
  }

  // ========================= Gestión de penalización =============================================
  // Obtener todos los usuarios con disabled = true
  getDisabledUsers() {
    return this.firestore.collection('users', ref => ref.where('disabled', '==', true))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  // Actualizar estado de usuario a disabled = false
  updateUserDisabledStatus(email: string, disabled: boolean) {
    return this.firestore.collection('users', ref => ref.where('email', '==', email))
      .get().pipe(
        switchMap(snapshot => {
          if (snapshot.size > 0) {
            const doc = snapshot.docs[0];
            return from(doc.ref.update({ disabled: disabled }));
          } else {
            throw new Error('No se encontró ningún usuario con el email ${email}');
          }
        }),
        catchError(error => {
          console.error('Error al actualizar el estado de usuario:', error);
          throw error;
        })
      );
  }

  // Actualizar estado de reservas con el código dado a 'Perdonado'
  updateReservationStatus(code: string) {
    return this.firestore.collection('reservations', ref => ref.where('code', '==', code))
      .get().pipe(
        switchMap(snapshot => {
          const batch = this.firestore.firestore.batch();
          snapshot.docs.forEach(doc => {
            batch.update(doc.ref, { status: 'Perdonado' });
          });
          return from(batch.commit());
        }),
        catchError(error => {
          console.error('Error al actualizar el estado de reservas:', error);
          throw error;
        })
      );
  }

  updatecancelReservationStatus(sala: string) {
    return this.firestore.collection('reservations', ref => ref.where('sala', '==', sala))
      .get().pipe(
        switchMap(snapshot => {
          const batch = this.firestore.firestore.batch();
          snapshot.docs.forEach(doc => {
            batch.update(doc.ref, { status: 'Cancelada' });
          });
          return from(batch.commit());
        }),
        catchError(error => {
          console.error('Error al actualizar el estado de reservas:', error);
          throw error;
        })
      );
  }
}