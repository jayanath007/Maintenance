import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared';
import { CoreModule } from '../core';
import { MainLayoutRoutingModule } from './main-layout.routing';
import { MainLayoutComponent } from './main-layout.component';
import { reducers, featureName } from './reducers';


@NgModule({
  imports: [
    StoreModule.forFeature(featureName, reducers),
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    SharedModule,
    CoreModule,
    MainLayoutRoutingModule
  ],
  declarations: [MainLayoutComponent]
})
export class MainLayoutModule { }
