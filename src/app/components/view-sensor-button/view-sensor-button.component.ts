import { Component } from '@angular/core';
import { Plantation } from  '@/app/interfaces/plantation.interface';
import { Sensor } from '@/app/interfaces/sensor.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-sensor-button',
  imports: [],
  templateUrl: './view-sensor-button.component.html'
})
export class ViewSensorButtonComponent {

plantations: Plantation[] = [];



constructor(private router: Router) {}

// Redireccionamos a la pagina sensor
viewSensor(sensor: Sensor): void {
  this.router.navigate(['/sensor', sensor.id]);
}

}
