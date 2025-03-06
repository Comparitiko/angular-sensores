import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Plantation } from '../interfaces/plantation.interface';
import { Sensor } from '../interfaces/sensor.interface';

@Injectable({
  providedIn: 'root',
})
export class PlantationsService {
  private baseUrl = 'https://sensores.comparitiko.dev/api/plantations';

  private http = inject(HttpClient);

  public getPlantations() {
    return this.http.get<Plantation[]>(this.baseUrl);
  }

  public getPlantation(id: number) {
    return this.http.get<Plantation>(`${this.baseUrl}/${id}`);
  }

  public createPlantation(plantation: Plantation) {
    return this.http.post<Plantation>(this.baseUrl, plantation);
  }

  public getSensorsByPlantation(plantationId: number) {
    return this.http.get<Sensor[]>(
      `${this.baseUrl}/${plantationId}/sensors/data`
    );
  }
}
