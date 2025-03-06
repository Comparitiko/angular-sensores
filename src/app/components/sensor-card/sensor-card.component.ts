import {Component, input} from '@angular/core';
import {Sensor} from '@/app/interfaces/sensor.interface';
import {splitNsName} from '@angular/compiler';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sensor-card',
  imports: [
    RouterLink
  ],
  templateUrl: './sensor-card.component.html'
})
export class SensorCardComponent {
  public sensor = input.required<Sensor>();
  public plantation_id = input.required<number>();

  // Método para obtener la clase de color según la unidad
  getColorClass(unit: string): string {
    switch (unit.toLowerCase()) {
      case 'temperature':
        return 'bg-red-500';
      case 'humidity':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  }

  // Método para obtener el ícono según la unidad
  getIcon(sensorType: string): string {
    switch (sensorType.toLowerCase()) {
      case 'temperature':
        return '🌡️';
      case 'humidity':
        return '💧';
      default:
        return '📡';
    }
  }
  translate(sensorType: string): string {
    switch (sensorType.toLowerCase()) {
      case 'temperature':
        return 'Temperatura';
      case 'humidity':
        return 'Humedad';
      default:
        return 'Sensor';
    }
  }

  protected readonly splitNsName = splitNsName;
}
