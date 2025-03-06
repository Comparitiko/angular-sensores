import { Component, Input } from '@angular/core';
import { Sensor } from '@/app/interfaces/sensor.interface';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Plantation } from '@/app/interfaces/plantation.interface';

@Component({
  selector: 'app-sensor',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './sensors.component.html',
})
export class SensorComponent {
  @Input() sensors!: Sensor;  // Recibe el objeto Sensor como entrada
  @Input() plantation!: Plantation;  // Recibe un objeto Plantation como entrada

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