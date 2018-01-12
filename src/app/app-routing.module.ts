import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import {ArsComponent} from './ars/ars.component';
import {NetypeComponent} from './ne/netype/netype.component';
import {IfoComponent} from './ne/ifo/ifo.component';
import {NeReleaseComponent} from './ne/ne-release/ne-release.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'ars', component: ArsComponent},
  {path: 'netype', component: NetypeComponent},
  {path: 'ifo', component: IfoComponent},
  {path: 'nerel', component: NeReleaseComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
