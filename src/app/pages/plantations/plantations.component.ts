import { Component } from '@angular/core';
import { FooterComponent } from '@/app/components/footer/footer.component';
import { HeaderComponent } from '@/app/components/header/header.component';
import { Plantation } from  '@/app/interfaces/plantation.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantations',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './plantations.component.html'
})
export class PlantationsComponent {

  plantations: Plantation[] = [];

  constructor(private router: Router) {}

  verSensores(plantationId: number): void {
    this.router.navigate(['/sensores', plantationId]);
  }

}
