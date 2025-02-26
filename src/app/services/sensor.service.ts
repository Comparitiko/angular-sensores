import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sensor} from '@/app/interfaces/sensor.interface';
import {Plantation} from '@/app/interfaces/plantation.interface';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private apiUrl = 'https://sensores.comparitiko.dev/api';

  private httpClient = inject(HttpClient);

  private sensors = signal<Sensor[]>([]);

  public getSensors(plantationName: string) {
    let errorResponse = "";

    const response = this.httpClient.get<Sensor[]>(this.apiUrl + '/sensors', {
      params: {
        name: plantationName
      }
    }).subscribe({
      next: (resp: Sensor[]) => {
        this.sensors.set(resp);
      },
      error: (error) => {
        errorResponse = error;
        console.error('Error en la obtención de sensores:', error);
      }
    })
  }
}
