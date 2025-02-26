import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Plantation } from '../interfaces/plantation.interface';

@Injectable({
  providedIn: 'root',
})
export class PlantationsService {
  private baseUrl = 'https://sensores.comparitiko.dev/api/plantations';

  private http = inject(HttpClient);

  private plantations = signal<Plantation[]>([]);

  public getPlantations() {
    this.http.get<Plantation[]>(this.baseUrl).subscribe((plantations) => {
      this.plantations.update((state) => [...state, ...plantations]);
    });
  }
}
