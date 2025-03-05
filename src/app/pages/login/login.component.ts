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

  /**
   * Al hacer Submit, validamos el formulario y enviamos la solicitud HTTP POST a la API para autenticar al usuario.
   * Si la autenticación es exitosa, guardamos el token y el nombre de usuario en `sessionStorage`.
   * Si la autenticación falla, mostramos un mensaje de error.
   */
  async onSubmit() {
    if (this.loginForm.valid) {
      const user: User = {
        username: this.loginForm.get('name')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.isLoading.set(true);

      const response = await this.userService.login(user);

      response.subscribe({
        next: (response) => {
          this.userService.setUsername(response.username);
          this.userService.setToken(response.token);
        },
        error: () => {
          this.isLoading.set(false);
          this.errorInLogin.set(true);
        }
      })
    }
  }

  /**
   * Inicializa el formulario de login y valida los campos requeridos.
   */
  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
