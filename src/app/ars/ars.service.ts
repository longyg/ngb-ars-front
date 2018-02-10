import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ARS} from './ars';
import {ObjectModelSpec} from './view-om/om-spec';
import {NeRelease} from '../ne/ne-release/ne-release';

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

  getOm(id: string): Observable<ObjectModelSpec> {
    return this.http.get<ObjectModelSpec>('/api/om/' + id);
  }

  getAdaptationIdsOfOm(id: string): Observable<string[]> {
    return this.http.get<string[]>('/api/om/adaptations/' + id);
  }

  getNeReleaseOfOm(id: string): Observable<NeRelease> {
    return this.http.get<NeRelease>('/api/om/nerel/' + id);
  }
}

