import {inject, Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserResponse} from '../interfaces/userResponse.interface';
import {UserRegister} from '../interfaces/userRegister.interface';
import {User} from '@/app/interfaces/user.interface';
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
  /**
   * Registro de usuario.
   * Función que envía una solicitud HTTP POST a la API para registrar al usuario.
   * Devuelve un objeto UserResponse con el nombre de usuario y el token.
   */
  async register(user: UserRegister){

    return this.httpClient.post<UserResponse>(this.apiUrl + '/auth/register', {
      username: user.username,
      email: user.email,
      password: user.password,
      confirm_password: user.confirm_password
    })
  }

  /*---------LOGIN-----------*/
   /**
   * Función que envía una solicitud HTTP POST a la API para autenticar al usuario.
    * Devuelve un objeto UserResponse con el nombre de usuario y el token.
   */
  async login(user: User){

    return this.httpClient.post<UserResponse>(this.apiUrl + '/auth/login', {
      username: user.username,
      password: user.password
    })
  }
  /**
   * Cuándo el usuario cierra la sesión, borramos la sesión y lo redirecionamos a la página de login.
   */
  logout(){
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }

  /**
   * Guarda el token en `sessionStorage`.
   * Redirigimos a la página principal.
   * @param token
   */
  setToken (token: string) {
    sessionStorage.setItem('token', token);

    this.router.navigate(['/']);
  }

  /**
   * Guarda el nombre de usuario en `sessionStorage`.
   * @param username
   */
  setUsername (username: string) {
    sessionStorage.setItem('username', username);
  }
  /**
   * Devuelve el usuario actual.
   */
  getUser(){
    return this.user;
  }
}
