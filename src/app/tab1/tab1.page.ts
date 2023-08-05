import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { Chart, registerables} from 'chart.js';
import { ServiceService } from '../Service/service.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit , PipeTransform  {
  

  @ViewChild('heartRateCanvas', { static: true }) heartRateCanvas! : ElementRef;
  heartRateChart!: Chart;


  @ViewChild('temperatureCanvas', { static: true }) temperatureCanvas!: ElementRef;
  temperatureChart!: Chart;




    registro = {
      "id": 1,
      "pulsos": 80,
      "resultado": "Normal",
      "descripcion": "Ritmo cardíaco regular",
      "fecha_medicion": "2023-08-02T10:30:00",
      "nombre_paciente": "Jose Pérez"
    }
    registros : any ;
    transformRegistros: any = [];
    beatCount = 0;


  constructor( private service:ServiceService) {
    console.log("hola");
    this.registros = this.service.getRegistros();
    this.transformRegistros =  this.transform(this.registros);
    

    this.beatCount = this.transformRegistros[this.transformRegistros.length - 1].pulsos ;
 
    
    
    
  }
  transform(value: any): any[] {
    // Convierte el objeto de registros en un arreglo y devuelve el resultado
   
    
 
      return Object.keys(value).map((key) => value[key]);
  
  }



  async ngOnInit() {
    
  
    
    this.registros = await this.service.getRegistros();
    this.transformRegistros =  this.transform(this.registros);
    this.beatCount =  this.transformRegistros[this.transformRegistros.length - 1].pulsos;
    Chart.register(...registerables);

    this.createHeartRateChart();

     
    
  }
  async  ionViewWillEnter(){

    this.registros = await this.service.getRegistros();
    this.transformRegistros =  this.transform(this.registros);
    this.beatCount =  this.transformRegistros[this.transformRegistros.length - 1].pulsos;
    console.log(this.transformRegistros);
    this.createHeartRateChart();
  }


  createHeartRateChart() {
    const heartRateCanvasElement = this.heartRateCanvas.nativeElement;
    this.heartRateChart = new Chart(heartRateCanvasElement, {
      type: 'line',
      data: {
        labels: ['0S','60S'],
        datasets: [{
          label: '',
          data: [0,this.beatCount],
          borderColor: 'red',
          backgroundColor: 'transparent'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  

 



}

