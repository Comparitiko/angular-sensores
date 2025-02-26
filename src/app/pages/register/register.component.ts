import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { AuthService } from '../../services/auth.service'; // Importa el servicio
import { User } from '../../interfaces/user.interface'; // Importa la interfaz
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = ''; 

  formFields = [
    { id: 'username', type: 'text', placeholder: 'Nombre de usuario', icon: 'assets/icons/user.svg' },
    { id: 'email', type: 'email', placeholder: 'Correo Electrónico', icon: 'assets/icons/email.svg' },
    { id: 'password', type: 'password', placeholder: 'Contraseña', icon: 'assets/icons/lock.svg' },
    { id: 'confirmPassword', type: 'password', placeholder: 'Confirmar Contraseña', icon: 'assets/icons/lock.svg' }
  ];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(1)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Validación para verificar que las contraseñas coincidan
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.registerForm.valid) {
      const userData: User = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.authService.register(userData).subscribe({
        next: () => {
          console.log('Registro exitoso');
          this.router.navigate(['/login']); // Redirige al login tras el registro
        },
        error: (err: { error: { message: string; }; }) => {
          console.error('Error en el registro:', err);
          this.errorMessage = err.error?.message || 'Error en el registro';
        }
      });
    } else {
      // Marca todos los campos como "Touched" para mostrar los mensajes de error
      this.registerForm.markAllAsTouched();
    }
  }

  trackById(index: number, field: { id: string }) {
    return field.id;
  }
}
