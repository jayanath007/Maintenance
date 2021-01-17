import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StoreModule } from '@ngrx/store';

import { TicketsRoutingModule } from './tickets.routing';

import { featureName, reducers } from './reducers';

import { TicketsLayoutComponent } from './components/tickets-layout/tickets-layout.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketViewComponent } from './components/ticket-view/ticket-view.component';
import { TicketsSummaryComponent } from './components/tickets-summary/tickets-summary.component';

import { TicketsService } from './services/tickets.service';
import { DateRangePickerModule, SharedModule } from '../shared';
import { TicketListEffects } from './effects/ticket-list.effects';
import { TicketViewEffects } from './effects/ticket-view.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([TicketListEffects, TicketViewEffects]),
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatChipsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDividerModule,
    NgxChartsModule,
    TicketsRoutingModule,
    DateRangePickerModule,
    SharedModule,
  ],
  declarations: [
    TicketsLayoutComponent,
    TicketListComponent,
    TicketViewComponent,
    TicketsSummaryComponent
  ],
  providers: [TicketsService]
})
export class TicketsModule { }
