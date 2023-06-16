import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Chart, registerables} from 'chart.js';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('heartRateCanvas', { static: true }) heartRateCanvas! : ElementRef;
  heartRateChart!: Chart;


  @ViewChild('temperatureCanvas', { static: true }) temperatureCanvas!: ElementRef;
  temperatureChart!: Chart;




  

  constructor() {
  
  
  }


  ngOnInit() {
    
    Chart.register(...registerables);

    this.createHeartRateChart();

    this.createTemperatureChart();
  
    
  }


  createHeartRateChart() {
    const heartRateCanvasElement = this.heartRateCanvas.nativeElement;
    this.heartRateChart = new Chart(heartRateCanvasElement, {
      type: 'line',
      data: {
        labels: ['10S', '20S', '30S', '40S', '50S', '60S'],
        datasets: [{
          label: 'Moderado ',
          data: [10, 35, 50, 75, 90, 100],
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

  createTemperatureChart() {
    const temperatureCanvasElement = this.temperatureCanvas.nativeElement;
    this.temperatureChart = new Chart(temperatureCanvasElement, {
      type: 'bar',
      data: {
        labels: ['0','60s'],
        datasets: [{
        label: '30 C°',
          data: [0,30],
          backgroundColor: '#FF6384',
          borderColor: '#FF6384',
          borderWidth: 1
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

