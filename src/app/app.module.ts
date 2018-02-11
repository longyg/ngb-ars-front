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
import { ParentObjectComponent } from './ne/parent-object/parent-object.component';
import {PtoService} from './ne/parent-object/parent-object.service';
import { AlarmObjectComponent } from './ne/alarm-object/alarm-object.component';
import {AlarmObjectService} from './ne/alarm-object/alarm-object.service';
import { AdaptationComponent } from './ne/adaptation/adaptation.component';
import {AdaptationService} from './ne/adaptation/adaptation.service';
import { ObjectLoadComponent } from './ne/object-load/object-load.component';
import {ObjectLoadService} from './ne/object-load/object-load.service';
import { ReleaseConfigComponent } from './ne/release-config/release-config.component';
import {ReleaseConfigService} from './ne/release-config/release-config.service';
import { AddReleaseConfigComponent } from './ne/release-config/add-release-config/add-release-config.component';
import { ViewOmComponent } from './ars/view-om/view-om.component';
import { ViewPmComponent } from './ars/view-pm/view-pm.component';
import { ViewAlarmComponent } from './ars/view-alarm/view-alarm.component';
import { ViewCounterComponent } from './ars/view-counter/view-counter.component';

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
    NeReleaseComponent,
    ParentObjectComponent,
    AlarmObjectComponent,
    AdaptationComponent,
    ObjectLoadComponent,
    ReleaseConfigComponent,
    AddReleaseConfigComponent,
    ViewOmComponent,
    ViewPmComponent,
    ViewAlarmComponent,
    ViewCounterComponent
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
  providers: [
    ArsService,
    NetypeService,
    IfoService,
    NeReleaseService,
    PtoService,
    AlarmObjectService,
    AdaptationService,
    ObjectLoadService,
    ReleaseConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
