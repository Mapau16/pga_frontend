import { Component, computed } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  public user = computed(() => this._authService.currentUser());

  public sidebarItems = [
    {label: 'Administración', icon: 'label_important', url: '/administration'},
  ]

  constructor(private _authService: AuthService) { }

  public logout(): void {
    this._authService.logout();
  }
}
