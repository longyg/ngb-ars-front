import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NeType} from './netype';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';

@Injectable()
export class NetypeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<NeType[]> {
    return this.http.get<NeType[]>('/api/netype');
  }

  update(neType: NeType): Observable<Object> {
    return this.http.put<Object>('/api/netype/' + neType.id, neType);
  }

  add(neType: NeType): Observable<NeType> {
    return this.http.post<NeType>('/api/netype', neType);
  }

  delete(id: string): Observable<Object> {
    return this.http.delete<Object>('/api/netype/' + id);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
