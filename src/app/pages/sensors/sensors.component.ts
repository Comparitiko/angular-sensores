import { Plantation } from '@/app/interfaces/plantation.interface';
import { PlantationsService } from '@/app/services/plantations.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ErrorFieldComponent } from '../../components/error-field/error-field.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import {SensorCardComponent} from '@/app/components/sensor-card/sensor-card.component';

@Component({
  selector: 'app-sensor',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ErrorFieldComponent,
    SensorCardComponent,
  ],
  templateUrl: './sensors.component.html',
})
export class SensorComponent implements OnInit {
  @Input() plantationId!: number;
  protected isLoading = signal<boolean>(true);
  protected errorGettingPlatation = signal<boolean>(false);
  protected plantation = signal<Plantation>({} as Plantation);
  private plantationsService = inject(PlantationsService);

  ngOnInit(): void {
    const res = this.plantationsService.getPlantationById(this.plantationId);

    res.subscribe({
      next: (plantation) => {
        this.plantation.set(plantation);
        this.isLoading.set(false);
      },

      error: () => {
        this.errorGettingPlatation.set(true);
        this.isLoading.set(false);
      },
    });
  }
}
