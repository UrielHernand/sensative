import { Component ,ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild(IonModal) modal!: IonModal;

  message = '';
  name: string;

  opcionSeleccionada: string;
  opcionSeleccionada1: string;
  fechaHoraActual: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  constructor(private router: Router) {

    this.modal = this.modal;
    this.name=""
    this.opcionSeleccionada = '';
    this.opcionSeleccionada1 = '';
    this.fechaHoraActual=""
    this.obtenerFechaHoraActual();
    
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.router.navigate(['/tabs', 'tab1']);
    
  }

  obtenerFechaHoraActual() {
    const fechaHora = new Date();
    const dia = fechaHora.getDate();
    const mes = fechaHora.getMonth() + 1; // Los meses se indexan desde 0
    const año = fechaHora.getFullYear();
    const hora = fechaHora.getHours();
    const minutos = fechaHora.getMinutes();

    this.fechaHoraActual = `${dia}/${mes}/${año} ${hora}:${minutos}`;
  }

}
