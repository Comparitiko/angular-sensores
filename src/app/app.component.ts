import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from '@/app/pages/login/login.component';
import {PlantationsComponent} from '@/app/pages/plantations/plantations.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, PlantationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-sensores';
}
