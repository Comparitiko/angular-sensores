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

    return this.httpClient.get<Sensor[]>(this.apiUrl + '/plantations/name' + plantationName);
  }
}
