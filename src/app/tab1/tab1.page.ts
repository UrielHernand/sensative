import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables  } from 'chart.js';

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
          label: 'Moderado',
          data: [70, 75, 80, 85, 90, 95],
          borderColor: '#36A2EB',
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
        labels: ['10s', '20s', '30s', '40s', '50s', '60s'],
        datasets: [{
          label: 'Temperatura',
          data: [18, 20, 22, 25, 28, 30],
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

