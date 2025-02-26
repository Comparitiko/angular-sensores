import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { Router } from '@angular/router';
import { UserService } from '@/app/services/user.service';
import { UserRegister } from '@/app/interfaces/userRegister.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = ''; 

  formFields = [
    { id: 'username', type: 'text', placeholder: 'Nombre de usuario', iconComponent: 'user' },
    { id: 'email', type: 'email', placeholder: 'Correo Electrónico', iconComponent: 'email' },
    { id: 'password', type: 'password', placeholder: 'Contraseña', iconComponent: 'lock' },
    { id: 'confirmPassword', type: 'password', placeholder: 'Confirmar Contraseña', iconComponent: 'lock' }
  ];
  

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {
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

  // Método para obtener un FormControl desde el formulario
  getFormControl(fieldId: string): FormControl {
    return this.registerForm.get(fieldId) as FormControl;
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
      const userData: UserRegister = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirm_password: this.registerForm.value.confirmPassword
      };

      this.authService.register(userData);
    }
  }
}
