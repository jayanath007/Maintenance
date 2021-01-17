import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, AuthGuard } from './auth';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot_password', component: ForgotPasswordComponent },
  { path: 'reset_password/:email', component: ResetPasswordComponent },
  { path: 'reset_password/:email/:token', component: ResetPasswordComponent },
  {
    path: 'main',
    redirectTo: '/main/tickets',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./main-layout/main-layout.module').then(
        mod => mod.MainLayoutModule
      ),
    canActivateChild: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/main/tickets',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/main/tickets',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
