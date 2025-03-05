import {inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SensorData} from '@/app/interfaces/sensorData.interface';
import {Sensor} from '@/app/interfaces/sensor.interface';

@Injectable({
  providedIn: 'root'
})
export class SensorDataServiceTsService {
  router = inject(Router);
  httpClient = inject(HttpClient);

  private sensor = signal<SensorData|null>(null);
  private apiUrl = 'https://sensores.comparitiko.dev/api';
  async getSensorData(sensor_id: number){
    return this.httpClient.get<SensorData>(this.apiUrl + '/sensors/data/', {
    });
  }
}
