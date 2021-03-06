import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import {ArsComponent} from './ars/ars.component';
import {NetypeComponent} from './ne/netype/netype.component';
import {IfoComponent} from './ne/ifo/ifo.component';
import {NeReleaseComponent} from './ne/ne-release/ne-release.component';
import {ParentObjectComponent} from './ne/parent-object/parent-object.component';
import {AlarmObjectComponent} from './ne/alarm-object/alarm-object.component';
import {AdaptationComponent} from './ne/adaptation/adaptation.component';
import {ObjectLoadComponent} from './ne/object-load/object-load.component';
import {ReleaseConfigComponent} from './ne/release-config/release-config.component';
import {AddReleaseConfigComponent} from './ne/release-config/add-release-config/add-release-config.component';
import {ViewOmComponent} from './ars/view-om/view-om.component';
import {ViewPmComponent} from './ars/view-pm/view-pm.component';
import {ViewCounterComponent} from './ars/view-counter/view-counter.component';
import {ViewAlarmComponent} from './ars/view-alarm/view-alarm.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'ars', component: ArsComponent},
  {path: 'netype', component: NetypeComponent},
  {path: 'ifo', component: IfoComponent},
  {path: 'nerel', component: NeReleaseComponent},
  {path: 'pto', component: ParentObjectComponent},
  {path: 'ao', component: AlarmObjectComponent},
  {path: 'adap', component: AdaptationComponent},
  {path: 'ol', component: ObjectLoadComponent},
  {path: 'relconfig', component: ReleaseConfigComponent},
  {path: 'add-rel-config', component: AddReleaseConfigComponent},
  {path: 'view-om/:id', component: ViewOmComponent},
  {path: 'view-pm/:id', component: ViewPmComponent},
  {path: 'view-counter/:id', component: ViewCounterComponent},
  {path: 'view-alarm/:id', component: ViewAlarmComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
