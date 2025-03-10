import {Component, inject, input, Input, signal} from '@angular/core';
import {ErrorFieldComponent} from '@/app/components/error-field/error-field.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Plantation} from '@/app/interfaces/plantation.interface';
import {Sensor} from '@/app/interfaces/sensor.interface';
import {SensorDataService} from '@/app/services/sensor-data.service';
import {SaveData, SensorData} from '@/app/interfaces/sensorData.interface';

@Component({
  selector: 'app-save-data',
  imports: [
    ErrorFieldComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './save-data.component.html'
})
export class SaveDataComponent {
  saveForm!: FormGroup;

  sensor = input.required<Sensor>();

  errorInSave = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  sensorDataService = inject(SensorDataService);
  router = inject(Router);

  /**
   * Al iniciar el componente, inicializamos el formulario.
   */
  ngOnInit(): void {
    this.saveForm = this.initForm();
  }


  /**
   * Inicializamos el formulario.
   */
  initForm(): FormGroup {
    return new FormGroup({
      value: new FormControl('', [Validators.required])
    });
  }

  /**
   * Al hacer Submit, guardamos los datos del sensor y redirigimos a la vista de los datos del sensor.
   */
  async onSubmit() {
    if (!this.saveForm.valid) {
      return;
    }
    const sensor: SaveData = {
      sensor_id: this.sensor().id,
      value: this.saveForm.get('value')?.value
    }
    console.log(sensor);

    this.isLoading.set(true);

    const response = this.sensorDataService.saveData(sensor);

    response.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/plantations/sensors', this.sensor().id]);
      },
      error: () => {
        this.isLoading.set(false);
        this.errorInSave.set(true);
      }
    })


  }


}
