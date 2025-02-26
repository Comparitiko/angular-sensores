import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private readonly fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }



  onSubmit(): void {
    if (this.loginForm.valid) {
      const user: User = {
        username: this.loginForm.get('name')?.value,
        password: this.loginForm.get('password')?.value
      };


      this.userService.login(user).then(
        (response: any) => {
          console.log('Login exitoso:', response);
        }
      ).catch(
        (error: any) => {
          console.error('Error en el login:', error);
        }
      );
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
}
