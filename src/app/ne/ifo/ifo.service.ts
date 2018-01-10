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

  update(entity: InterfaceObject): Observable<Object> {
    return this.http.put<Object>('/api/ifo/' + entity.id, entity);
  }

  add(entity: InterfaceObject): Observable<InterfaceObject> {
    return this.http.post<InterfaceObject>('/api/ifo', entity);
  }

  delete(id: string): Observable<Object> {
    return this.http.delete<Object>('/api/ifo/' + id);
  }

  deleteAll(ids: string[]): Observable<Object> {
    return this.http.post<Object>('/api/ifo/delete', ids);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
