import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SensorDataService, SensorData } from '../../services/sensor-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sensor-data',
  standalone: true,
  imports: [CanvasJSAngularChartsModule, HeaderComponent, FooterComponent, DatePipe],
  templateUrl: './sensor-data.component.html'
})
export class SensorDataComponent implements OnInit {

  sensorData: { date: Date; temperature: number | null; humidity: number | null; pressure: number | null }[] = [];

  chartOptions: any;

  constructor(private sensorDataService: SensorDataService) {}

  ngOnInit(): void {
    this.loadSensorData();
  }

  loadSensorData(): void {
    const sensorId = 1; 
    this.sensorDataService.getSensorData(sensorId).subscribe({
      next: (response: SensorData) => {
        this.sensorData = response.records.map((record: { values: { _time: string | number | Date; _field: string; _value: any; }; }) => ({
          date: new Date(record.values._time),
          temperature: record.values._field === 'temperature' ? record.values._value : null,
          humidity: record.values._field === 'humidity' ? record.values._value : null,
          pressure: record.values._field === 'pressure' ? record.values._value : null
        }));
        this.loadChartOptions();
      },
      error: (err) => console.error(err)
    });
  }

  loadChartOptions(): void {
    this.chartOptions = {
      animationEnabled: true,
      theme: "light2",
      title: { text: "Datos del Sensor" },
      axisX: { valueFormatString: "MMM DD, YYYY" },
      axisY: { title: "Valores" },
      toolTip: { shared: true },
      legend: { cursor: "pointer" },
      data: [
        {
          type: "line",
          name: "Temperatura (°C)",
          showInLegend: true,
          dataPoints: this.sensorData.filter(d => d.temperature !== null).map(d => ({ x: d.date, y: d.temperature }))
        },
        {
          type: "line",
          name: "Humedad (%)",
          showInLegend: true,
          dataPoints: this.sensorData.filter(d => d.humidity !== null).map(d => ({ x: d.date, y: d.humidity }))
        },
        {
          type: "line",
          name: "Presión (hPa)",
          showInLegend: true,
          dataPoints: this.sensorData.filter(d => d.pressure !== null).map(d => ({ x: d.date, y: d.pressure }))
        }
      ]
    };
  }
}