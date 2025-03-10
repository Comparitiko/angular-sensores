import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '@/app/components/header/header.component';
import {FooterComponent} from '@/app/components/footer/footer.component';
import {SaveDataComponent} from '@/app/components/save-data/save-data.component';
import {SensorService} from '@/app/services/sensor.service';
import {Sensor} from '@/app/interfaces/sensor.interface';

@Component({
  selector: 'app-new-data',
  imports: [
    HeaderComponent,
    FooterComponent,
    SaveDataComponent
  ],
  templateUrl: './new-data.component.html'
})
export class NewDataComponent implements OnInit {

  protected sensorService = inject(SensorService);
  public sensor = signal<Sensor>({} as Sensor);
  @Input({required: true}) sensorId!: number;

  ngOnInit(): void {
    this.sensorService.getSensorById(this.sensorId).subscribe({
      next: (sensor) => {
        this.sensor.set(sensor);
      }
    })
  }



}
