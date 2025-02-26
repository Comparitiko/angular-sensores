import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@/app/services/user.service';
import { UserRegister } from '@/app/interfaces/userRegister.interface';
import { ErrorFieldComponent } from "../../components/error-field/error-field.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ErrorFieldComponent, ReactiveFormsModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = ''; 
  isSubmitting = false;

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
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

  // Método para saber si está cargando
  isLoading() {
    return ;
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      
      const userData: UserRegister = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirm_password: this.registerForm.value.confirmPassword
      };

      this.authService.register(userData)
        
    }
  }
}
