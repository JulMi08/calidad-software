import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router= inject(Router);


  // ==============LOAD===========
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  //========TOAST======
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }


  //====== URL
  routerLink(url: string){
  return this.router.navigateByUrl(url);
  }

///====== storage

saveInLocalStorage(key: string, value: any){
  return localStorage.setItem(key, JSON.stringify(value))
}

//==================000get
getFromLocalStorage(key: string){
  return JSON.parse(localStorage.getItem(key))
}

}
