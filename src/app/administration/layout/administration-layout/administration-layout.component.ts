import { Component, computed } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-administration-layout',
  templateUrl: './administration-layout.component.html',
  styleUrl: './administration-layout.component.css'
})
export class AdministrationLayoutComponent {

  public user = computed(() => this._authService.currentUser());

  public sidebarItems = [
    { label: 'Clientes', icon: 'label', url: '/administration/clients' },
    { label: 'Roles', icon: 'label', url: '/administration/roles' },
    { label: 'Lineamientos', icon: 'label', url: '/administration/guidelines' },
    { label: 'Preguntas', icon: 'label', url: '/administration/questions' },
    { label: 'Procesos', icon: 'label', url: '/administration/process' },
    { label: 'Criterios', icon: 'label', url: '/administration/criterio' },
    { label: 'Revisión', icon: 'label', url: '/administration/review' },
    { label: 'Dashboard', icon: 'donut_small', url: '/dashboard/statistics' },
  ]

  isSidenavOpen = true;

  constructor(private _authService: AuthService, 
    private breakpointObserver: BreakpointObserver) { }

public logout(): void {
this._authService.logout();
}

ngOnInit(): void {
this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset])
.subscribe(result => {
this.isSidenavOpen = !result.matches;
});
}
}
