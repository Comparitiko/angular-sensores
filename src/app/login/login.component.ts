import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private readonly fb: FormBuilder private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user = {
        name: this.loginForm.get('name')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.userService.login(user).subscribe(
        (response: any) => {
          console.log('Login exitoso:', response);
        },
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
