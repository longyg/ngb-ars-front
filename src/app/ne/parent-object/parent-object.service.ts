import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ParentObject} from './parent-object';

@Injectable()
export class PtoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ParentObject[]> {
    return this.http.get<ParentObject[]>('/api/pto');
  }

  update(entity: ParentObject): Observable<Object> {
    return this.http.put<Object>('/api/pto/' + entity.id, entity);
  }

  add(entity: ParentObject): Observable<ParentObject> {
    return this.http.post<ParentObject>('/api/pto', entity);
  }

  delete(id: string): Observable<Object> {
    return this.http.delete<Object>('/api/pto/' + id);
  }

  deleteAll(ids: string[]): Observable<Object> {
    return this.http.post<Object>('/api/pto/delete', ids);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
