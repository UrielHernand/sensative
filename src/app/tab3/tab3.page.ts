import { Component ,ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';


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

  registro = {
    "id": Math.floor(Math.random() * 1000) + 1 ,
    "pulsos": 0,
    "resultado": "Normal",
    "descripcion": "Ritmo cardíaco regular",
    "fecha_medicion": "2023-08-02T10:30:00",
    "nombre_paciente": "User"
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  async  ionViewWillEnter(){
    this.obtenerFechaHoraActual();
   }
   async showHelp() {
    this.setOpen(true);
  }
  

  constructor(private router: Router, private service:ServiceService) {

    this.modal = this.modal;
    this.name=""
    this.opcionSeleccionada = '';
    this.opcionSeleccionada1 = '';
    this.fechaHoraActual=""
    this.obtenerFechaHoraActual();
    this.setOpen(true);

    
  }                             



  

  async confirm() {
    // Cerrar el modal y navegar a otra página
    this.modal.dismiss(this.name, 'confirm');
    
    this.service.medirPulso(true);
  
    // Esperar 60 segundos
    await this.delay(60105);
  
    // Medir el pulso y esperar hasta que se resuelva la promesa
    const pulso:any = await this.service.leerDatos();
    console.log(pulso);
  
    // Obtener el estado del ritmo cardíaco y esperar hasta que se resuelva la promesa
    const estadoRitmoCardiaco = await this.obtenerEstadoRitmoCardiaco(pulso, this.opcionSeleccionada, this.opcionSeleccionada1, this.name, Math.floor(Math.random() * 100) + 1);
    console.log(estadoRitmoCardiaco);
  
    // Escribir los datos en la base de datos y esperar hasta que se resuelva la promesa
    await this.service.escribirDatos(this.registro);
    this.router.navigate(['/tabs', 'tab1']);
    this.service.medirPulso(false);

  }
  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  obtenerEstadoRitmoCardiaco(pulso: number, actividad: string, estadoAnimo: string,name: string , id:number) {
    let estado: string;
    let descripcion: string;

    // Establecer el estado del ritmo cardíaco según el pulso
    if (pulso < 60) {
      estado = 'Bajo';
    } else if (pulso >= 60 && pulso <= 100) {
      estado = 'Normal';
    } else {
      estado = 'Alto';
    }

    // Establecer la descripción del ritmo cardíaco según la actividad y el estado de ánimo
    switch (actividad) {
      case 'Ejercicio':
        descripcion = `Realizaste ejercicio y tu ritmo cardíaco es ${estado}.`;
        break;
      case 'Inactivo':
        descripcion = `Estuviste inactivo y tu ritmo cardíaco es ${estado}.`;
        break;
      case 'Actividad moderada':
        descripcion = `Realizaste actividad moderada y tu ritmo cardíaco es ${estado}.`;
        break;
      case 'Descanso':
        descripcion = `Estás en un momento de descanso y tu ritmo cardíaco es ${estado}.`;
        break;
      default:
        descripcion = `Tu ritmo cardíaco es ${estado}.`;
        break;
    }

    switch (estadoAnimo) {
      case 'Feliz':
        descripcion += ' Tú estado de  ánimo es feliz.';
        break;
      case 'Triste':
        descripcion += ' Tú estado de  ánimo es triste.';
        break;
      case 'Enojado':
        descripcion += ' Tú estado de  ánimo es enojado.';
        break;
      case 'Ansioso':
        descripcion += ' Te sientes  esansioso.';
        break;
      case 'Neutral':
        descripcion += ' Tú estado de  ánimo es neutral.';
        break;
      default:
        descripcion += ' No hay información adicional sobre el estado de ánimo.';
        break;
    }

   
    
   return  this.registro = { 
      "id": id,
      "pulsos": pulso,
      "resultado": estado,
      "descripcion": descripcion,
      "fecha_medicion": this.fechaHoraActual,
      "nombre_paciente": name
    }

    
   
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

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

 

}
