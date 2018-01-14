import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AlarmObject} from './alarm-object';

@Injectable()
export class AlarmObjectService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<AlarmObject[]> {
    return this.http.get<AlarmObject[]>('/api/ao');
  }

  update(entity: AlarmObject): Observable<Object> {
    return this.http.put<Object>('/api/ao/' + entity.id, entity);
  }

  add(entity: AlarmObject): Observable<AlarmObject> {
    return this.http.post<AlarmObject>('/api/ao', entity);
  }

  delete(id: string): Observable<Object> {
    return this.http.delete<Object>('/api/ao/' + id);
  }

  deleteAll(ids: string[]): Observable<Object> {
    return this.http.post<Object>('/api/ao/delete', ids);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
