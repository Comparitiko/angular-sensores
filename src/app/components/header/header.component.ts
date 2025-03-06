import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { UserService } from '@/app/services/user.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  onLogout(): void {
    this.userService.logout();
  }

  protected readonly history = history;
}
