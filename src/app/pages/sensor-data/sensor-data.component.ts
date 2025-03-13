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

  // Recibe el ID del sensor desde el componente padre
  @Input() sensorId!: number;

  // Estado para indicar si los datos están cargando
  protected isLoading = signal<boolean>(true);

  // Estado para indicar si ocurrió un error al cargar los datos
  protected error = signal<boolean>(false);

  // Datos del sensor
  sensorData = signal<any>({} as any);

  // Tipo de sensor
  protected sensorType: string = '';

  // Opciones del gráfico
  chartOptions: any;

  constructor(private sensorDataService: SensorDataService) {}

  // Llama a la función para cargar datos cuando el componente se inicializa
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

      // Obtiene el tipo de sensor
      this.sensorType = response[0].records[0].values._measurement;

      const data = response[0].records.map((record) => ({
        date: new Date(record.values._time),
        [record.values._measurement]: record.values._value,
      }));

      this.sensorData.set(data); // Guarda los datos en la variable reactiva
      this.isLoading.set(false); // Indica que la carga ha finalizado
      this.loadChartOptions(); // Llama a la función para configurar las opciones del gráfico
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false);
      },
    });
  }

  translate(): string {
    // Traducir el tipo de sensor dependiendo del valor recibido
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
      title: { text: '🌿 Datos del Sensor' }, // Título del gráfico
      axisX: { valueFormatString: 'MMM DD, YYYY' }, // Formato del eje X
      axisY: { title: 'Valores' }, // Etiqueta del eje Y
      toolTip: { shared: true },
      legend: { cursor: 'pointer' },
      data: [
        {
          type: 'line', // Tipo de gráfico
          name: this.translate(),
          showInLegend: true,
          dataPoints: this.sensorData().map(
            (data: { [x: string]: any; date: any }) => ({
              x: data.date, // Asigna la fecha como eje X
              y: data[this.sensorType], // Asigna el valor del sensor como eje Y
            })
          ),
        },
      ],
    };
  }
}
