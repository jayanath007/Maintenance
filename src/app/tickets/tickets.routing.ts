import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsLayoutComponent } from './components/tickets-layout/tickets-layout.component';

const routes: Routes = [
  {
    path: '',
    component: TicketsLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}
