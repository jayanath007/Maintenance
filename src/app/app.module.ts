import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { AuthModule } from './auth';


@NgModule({
   imports: [
      BrowserModule,
      StoreModule.forRoot({}, {}),
      EffectsModule.forRoot([]),
      BrowserAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
      AuthModule.forRoot()
   ],
   declarations: [AppComponent],
   providers: [],
   bootstrap: [AppComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
