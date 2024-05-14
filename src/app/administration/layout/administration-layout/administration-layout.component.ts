import { Component, computed } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-administration-layout',
  templateUrl: './administration-layout.component.html',
  styleUrl: './administration-layout.component.css'
})
export class AdministrationLayoutComponent {

  public user = computed(() => this._authService.currentUser());

  public sidebarItems = [
    { label: 'Clientes', icon: 'label', url: '/administration/clients' },
    { label: 'Lineamientos', icon: 'label', url: '/administration/guidelines' },
    { label: 'Preguntas', icon: 'label', url: '/administration/questions' },
    { label: 'Procesos', icon: 'label', url: '/administration/process' },
    { label: 'Dashboard', icon: 'label', url: '/dashboard' },
  ]

  constructor(private _authService: AuthService) { }
}
