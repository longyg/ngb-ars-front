import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ARS} from './ars';

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
}

