import {Component, input, Input, signal} from '@angular/core';
import {ErrorFieldComponent} from '@/app/components/error-field/error-field.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {Plantation} from '@/app/interfaces/plantation.interface';
import {Sensor} from '@/app/interfaces/sensor.interface';

@Component({
  selector: 'app-save-data',
  imports: [
    ErrorFieldComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './save-data.component.html'
})
export class SaveDataComponent {
  sensor = input.required<Sensor>();


}
