import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ARS} from './ars';

@Injectable()
export class ArsService {

  constructor(private http: HttpClient) {}

  list(): Observable<ARS[]> {
    return this.http.get<ARS[]>('/api/ars');
  }
}

