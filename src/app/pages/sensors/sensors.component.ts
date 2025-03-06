import { Sensor } from '@/app/interfaces/sensor.interface';
import { PlantationsService } from '@/app/services/plantations.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ErrorFieldComponent } from '../../components/error-field/error-field.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-sensor',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ErrorFieldComponent,
  ],
  templateUrl: './sensors.component.html',
})
export class SensorComponent implements OnInit {
  @Input() plantationId!: number;
  protected isLoading = signal<boolean>(true);
  protected errorGettingSensors = signal<boolean>(true);
  protected sensors = signal<Sensor[]>([]);
  private plantationsService = inject(PlantationsService);

  ngOnInit(): void {
    const res = this.plantationsService.getSensorsByPlantation(
      this.plantationId
    );

    res.subscribe({
      next: (sensors) => {},

      error: () => {
        console.log('error');
      },
    });
  }

  // Método para obtener la clase de color según la unidad
  getColorClass(unit: string): string {
    switch (unit) {
      case 'temperature':
        return 'bg-red-500';
      case 'humidity':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  }

  // Método para obtener el ícono según la unidad
  getIcon(unit: string): string {
    switch (unit) {
      case 'temperature':
        return '🌡️';
      case 'humidity':
        return '💧';
      default:
        return '📡';
    }
  }
}
