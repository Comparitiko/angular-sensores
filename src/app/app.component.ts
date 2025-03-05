import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-sensores';
}
