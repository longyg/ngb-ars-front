import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Adaptation} from './adaptation';

@Injectable()
export class AdaptationService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Adaptation[]> {
    return this.http.get<Adaptation[]>('/api/adap');
  }

  get(id: string): Observable<Adaptation> {
    return this.http.get<Adaptation>('/api/adap/' + id);
  }

  update(entity: Adaptation): Observable<Object> {
    return this.http.put<Object>('/api/adap/' + entity.id, entity);
  }

  add(entity: Adaptation): Observable<Adaptation> {
    return this.http.post<Adaptation>('/api/adap', entity);
  }

  delete(id: string): Observable<Object> {
    return this.http.delete<Object>('/api/adap/' + id);
  }

  deleteAll(ids: string[]): Observable<Object> {
    return this.http.post<Object>('/api/adap/delete', ids);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
