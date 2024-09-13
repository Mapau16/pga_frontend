import { Component, computed } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  public user = computed(() => this._authService.currentUser());

  public sidebarItems = [
    {label: 'Administración', icon: 'settings', url: '/administration'},
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
