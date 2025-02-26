import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ErrorFieldComponent } from '../../components/error-field/error-field.component';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ErrorFieldComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;

  errorInLogin = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  constructor(
    private readonly fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user: User = {
        username: this.loginForm.get('name')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.isLoading.set(true);

      this.userService
        .login(user)
        .then((response: any) => {
          console.log('Login exitoso:', response);
        })
        .catch((error: any) => {
          console.error('Error en el login:', error);
          this.errorInLogin.set(true);
          this.isLoading.set(false);
        });
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
