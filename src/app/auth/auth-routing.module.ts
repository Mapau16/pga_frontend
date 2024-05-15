import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

import { publicGuard } from './guards/public.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [publicGuard],
    children: [
        { path: 'login', component: LoginPageComponent, canActivate: [publicGuard] },
        { path: 'register', component: RegisterPageComponent, canActivate: [publicGuard] },
        { path:  '**', redirectTo: 'login'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
