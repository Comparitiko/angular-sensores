import {inject, Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import * as repl from 'node:repl';
import {User} from './interfaces/user.interface';
import {UserResponse} from './interfaces/userResponse.interface';
import {UserRegister} from './interfaces/userRegister.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Injectamos la clase Router para poder navegar a otras páginas
  router = inject(Router);
  httpClient = inject(HttpClient);


  private user = signal<UserResponse|null>(null);
  private apiUrl = 'https://sensores.comparitiko.dev/api';

  constructor() { }
  /*---------REGISTRO-----------*/
  async register(user: UserRegister){

  }





  /*---------LOGIN-----------*/
   /**
   * Función que envía una solicitud HTTP POST a la API para autenticar al usuario.
   * Si el login es exitoso:
   *  - Guarda el nombre de usuario y el token en `sessionStorage`.
   *  - Actualiza el estado del usuario en la aplicación.
   *  - Redirige a la página principal ('/').
   *
   * En caso de error, almacena el mensaje de error en `errorResponse`.
   */
  async login(user: User){
     let errorResponse = "";

    const response = this.httpClient.post<UserResponse>(this.apiUrl + '/auth/login', {
      username: user.username,
      password: user.password
    })

    response.subscribe({
      next: (resp: UserResponse) => {
        this.user.set(resp as UserResponse);
        sessionStorage.setItem('username', resp.username);
        sessionStorage.setItem('token', resp.token);
        this.router.navigate(['/']);
      },
      error: (error) => errorResponse = error
    })
  }

  /**
   * Devuelve el usuario actual
   */
  getUser(){
    return this.user;
  }

  /**
   * Cuándo el usuario cierra la sesión, borramos la sesión y lo redirecionamos a la página de login
   */
  logout(){
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}
