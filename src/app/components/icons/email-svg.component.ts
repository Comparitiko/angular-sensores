import { Component } from '@angular/core';

@Component({
  selector: 'app-email-svg',
  standalone: true,
  template: `
    <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
         viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `
})
export class EmailSvgComponent {}
