import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-text',
  standalone: true,  // 🔹 Indica que es standalone
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  imports: [CommonModule, ReactiveFormsModule] // 🔹 Importa lo necesario
})
export class InputTextComponent {
getErrorMessage() {
throw new Error('Method not implemented.');
}
  @Input() id!: string;
  @Input() type: string = 'text';
  @Input() placeholder!: string;
  @Input() icon?: string;
  @Input() control!: FormControl;
}
