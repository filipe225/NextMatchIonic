import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastService {

    constructor(private toastCtrl: ToastController) { }

    async showToast(message: string, color: string, duration?: number) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: duration || 1000,
            color: color
        });
        toast.present();
    }
}