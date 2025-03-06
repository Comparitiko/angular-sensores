import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Plantation } from '../interfaces/plantation.interface';

@Injectable({
  providedIn: 'root',
})
export class PlantationsService {
  private baseUrl = 'https://sensores.comparitiko.dev/api';

  private http = inject(HttpClient);

  public getPlantations() {
    return this.http.get<Plantation[]>(`${this.baseUrl}/plantations`);
  }

  public getPlantationById(plantationId: number) {
    return this.http.get<Plantation>(
      `${this.baseUrl}/plantations/${plantationId}`
    );
  }
}
