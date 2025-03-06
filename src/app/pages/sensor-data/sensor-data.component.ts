import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SensorDataResponse } from '../../interfaces/sensorData.interface';
import { SensorDataService } from '../../services/sensor-data.service';

@Component({
  selector: 'app-sensor-data',
  standalone: true,
  imports: [
    CanvasJSAngularChartsModule,
    HeaderComponent,
    FooterComponent,
    DatePipe,
  ],
  templateUrl: './sensor-data.component.html',
})
export class SensorDataComponent implements OnInit {
  @Input() sensorId!: number;
  protected isLoading = signal<boolean>(true);
  protected error = signal<boolean>(false);
  sensorData = signal<any>({} as any);
  protected sensorType: string = '';

  chartOptions: any;

  constructor(private sensorDataService: SensorDataService) {}

  ngOnInit(): void {
    this.loadSensorData();
  }

  loadSensorData(): void {
    // @ts-ignore
    this.sensorDataService.getSensorData(this.sensorId).subscribe({
      complete(): void {},
      next: (response: SensorDataResponse) => {
        if (!response[0]) {
          this.error.set(true);
          return;
        }

        this.sensorType = response[0].records[0].values._measurement;

        const data = response[0].records.map((record) => ({
          date: new Date(record.values._time),
          [record.values._measurement]: record.values._value,
        }));

        this.sensorData.set(data);
        this.isLoading.set(false);
        this.loadChartOptions();
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false);
      },
    });
  }
  translate(): string {
    switch (this.sensorType.toLowerCase()) {
      case 'temperature':
        return 'Temperatura';
      case 'humidity':
        return 'Humedad';
      case 'pressure':
        return 'Presión';
      default:
        return 'Sensor';
    }
  }

  loadChartOptions(): void {
    this.chartOptions = {
      animationEnabled: true,
      theme: 'light2',
      title: { text: '🌿 Datos del Sensor' },
      axisX: { valueFormatString: 'MMM DD, YYYY' },
      axisY: { title: 'Valores' },
      toolTip: { shared: true },
      legend: { cursor: 'pointer' },
      data: [
        {
          type: 'line',
          name: this.translate(),
          showInLegend: true,
          dataPoints: this.sensorData().map(
            (data: { [x: string]: any; date: any }) => ({
              x: data.date,
              y: data[this.sensorType],
            })
          ),
        },
      ],
    };
  }
}
