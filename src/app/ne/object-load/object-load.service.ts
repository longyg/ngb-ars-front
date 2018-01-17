import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ObjectLoad} from './object-load';

@Injectable()
export class ObjectLoadService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ObjectLoad[]> {
    return this.http.get<ObjectLoad[]>('/api/ol');
  }

  update(entity: ObjectLoad): Observable<Object> {
    return this.http.put<Object>('/api/ol/' + entity.id, entity);
  }

  add(entity: ObjectLoad): Observable<ObjectLoad> {
    return this.http.post<ObjectLoad>('/api/ol', entity);
  }

  delete(id: string): Observable<Object> {
    return this.http.delete<Object>('/api/ol/' + id);
  }

  deleteAll(ids: string[]): Observable<Object> {
    return this.http.post<Object>('/api/ol/delete', ids);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
