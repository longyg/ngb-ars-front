import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ARS} from './ars';

@Injectable()
export class ArsService {
  url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  list(): Observable<ARS[]> {
    return this.http.get<ARS[]>(this.url + 'ars');
  }
}

