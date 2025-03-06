import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorData } from '../interfaces/sensorData.interface';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  // URL de la API
  private apiUrl = 'https://sensores.comparitiko.dev/api';

  constructor(private httpClient: HttpClient) {}

  // Obtener los datos específicos de un sensor
  getSensorData(sensor_id: number): Observable<SensorData> {
    return this.httpClient.get<SensorData>(
      // URL de la API para obtener los datos de un sensor
      `${this.apiUrl}/sensors/data/${sensor_id}`
    );
  }
}


