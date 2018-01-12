import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { NavComponent } from './nav/nav.compponent';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ArsComponent } from './ars/ars.component';
import { ArsService } from './ars/ars.service';
import { NetypeComponent } from './ne/netype/netype.component';
import { NetypeService } from './ne/netype/netype.service';
import { StatusComponent } from './common/status/status.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { IfoComponent } from './ne/ifo/ifo.component';
import {IfoService} from './ne/ifo/ifo.service';
import { NeReleaseComponent } from './ne/ne-release/ne-release.component';
import {NeReleaseService} from './ne/ne-release/ne-release.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ArsComponent,
    NetypeComponent,
    StatusComponent,
    PaginationComponent,
    IfoComponent,
    NeReleaseComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ArsService, NetypeService, IfoService, NeReleaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
