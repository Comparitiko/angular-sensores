import { Component } from '@angular/core';

@Component({
  selector: 'app-lock-svg',
  standalone: true,
  template: `
    <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
         viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="12" x="3" y="10" rx="2"></rect>
      <path d="M7 10V7a5 5 0 0110 0v3"></path>
      <line x1="12" y1="15" x2="12" y2="17"></line>
    </svg>
  `
})
export class LockSvgComponent {}
