import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ARS} from './ars';
import {ObjectModelSpec} from './view-om/om-spec';
import {NeRelease} from '../ne/ne-release/ne-release';
import {PmDataLoadSpec} from './view-pm/pm-spec';
import {CounterSpec} from './view-counter/counter-spec';
import {AlarmSpec} from './view-alarm/alarm-spec';

@Injectable()
export class ArsService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<ARS[]> {
    return this.http.get<ARS[]>('/api/ars');
  }

  deleteAll(ids: string[]): Observable<Object> {
    return this.http.post<Object>('/api/ars/delete', ids);
  }

  generate(ars: ARS): Observable<ARS> {
    return this.http.post<ARS>('/api/ars/generate', ars);
  }

  getObjectModelSpec(id: string): Observable<ObjectModelSpec> {
    return this.http.get<ObjectModelSpec>('/api/om/' + id);
  }

  getPmDataLoadSpec(id: string): Observable<PmDataLoadSpec> {
    return this.http.get<PmDataLoadSpec>('/api/pmdl/' + id);
  }

  getCounterSpec(id: string): Observable<CounterSpec> {
    return this.http.get<CounterSpec>('/api/counter/' + id);
  }

  getAlarmSpec(id: string): Observable<AlarmSpec> {
    return this.http.get<AlarmSpec>('/api/alarm/' + id);
  }
}

