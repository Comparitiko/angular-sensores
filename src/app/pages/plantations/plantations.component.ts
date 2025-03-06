import {Component, inject, WritableSignal, signal, OnInit} from '@angular/core';
import { FooterComponent } from '@/app/components/footer/footer.component';
import { HeaderComponent } from '@/app/components/header/header.component';
import { Plantation } from  '@/app/interfaces/plantation.interface';
import {Router, RouterLink} from '@angular/router';
import {PlantationsService} from '@/app/services/plantations.service';

@Component({
  selector: 'app-plantations',
  imports: [FooterComponent, HeaderComponent, RouterLink],
  templateUrl: './plantations.component.html'
})
export class PlantationsComponent implements OnInit {

  constructor(private router: Router) {
  }

  private plantationsService = inject(PlantationsService);
  protected plantations = signal<Plantation[]>([]);
  protected error = signal<boolean>(false);
  protected isLoading = signal<boolean>(true);

  viewSensors(plantationId: number): void {
    this.router.navigate(['/sensores', plantationId]);
  }

  async ngOnInit() {
    const response = await this.plantationsService.getPlantations();

    response.subscribe({
      next:(plant: Plantation[])=> {
        this.plantations.set(plant);
        this.isLoading.set(false);
        console.log(plant);
      },
      error: ()=> {
        this.error.set(true);
        this.isLoading.set(false);
        console.log('error');
      }
    });
  }

}

