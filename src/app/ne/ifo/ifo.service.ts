import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InterfaceObject} from './ifo';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class IfoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<InterfaceObject[]> {
    return this.http.get<InterfaceObject[]>('/api/ifo');
  }
}
