import { UserRegister } from '@/app/interfaces/userRegister.interface';
import { UserService } from '@/app/services/user.service';
import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ErrorFieldComponent } from '../../components/error-field/error-field.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ErrorFieldComponent, ReactiveFormsModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  protected isLoading = signal<boolean>(false);
  protected errorInRegister = signal<boolean>(false);

  constructor(private fb: FormBuilder, private authService: UserService) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
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
  async onSubmit() {
    if (this.registerForm.valid) {
      const userData: UserRegister = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirm_password: this.registerForm.value.confirmPassword,
      };

      const res = await this.authService.register(userData);
      res.subscribe({
        next: (user) => {
          this.authService.setUsername(user.username);
          this.authService.setToken(user.token);
        },

        error: () => {
          this.errorInRegister.set(true);
          this.isLoading.set(false);
        },
      });
    }
  }
}
