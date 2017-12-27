import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NeType} from './netype';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NetypeService {
  constructor(private http: HttpClient) {}

  getNeTypes(): Observable<NeType[]> {
    return this.http.get<NeType[]>('/api/netype');
  }
}
