import { FooterComponent } from '@/app/components/footer/footer.component';
import { HeaderComponent } from '@/app/components/header/header.component';
import { Plantation } from '@/app/interfaces/plantation.interface';
import { PlantationsService } from '@/app/services/plantations.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantations',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './plantations.component.html',
})
export class PlantationsComponent implements OnInit {
  constructor(private router: Router) {}

  private plantationsService = inject(PlantationsService);
  protected plantations = signal<Plantation[]>([]);
  protected error = signal<boolean>(false);
  protected isLoading = signal<boolean>(true);

  viewSensors(plantationId: number): void {
    this.router.navigate(['/plantations/', plantationId , '/sensors']);
  }

  async ngOnInit() {
    const response = await this.plantationsService.getPlantations();

    response.subscribe({
      next: (plant: Plantation[]) => {
        this.plantations.set(plant);
        this.isLoading.set(false);
        console.log(plant);
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false);
        console.log('error');
      },
    });
  }
}
