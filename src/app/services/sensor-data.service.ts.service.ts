import { SensorData } from '@/app/interfaces/sensorData.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SensorDataServiceTsService {
  httpClient = inject(HttpClient);

  private apiUrl = 'https://sensores.comparitiko.dev/api';
  async getSensorData(sensor_id: number) {
    return this.httpClient.get<SensorData>(
      `${this.apiUrl}/sensors/data/${sensor_id}`
    );
  }
}
