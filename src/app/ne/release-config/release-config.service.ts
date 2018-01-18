import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ReleaseConfig} from './release-config';

@Injectable()
export class ReleaseConfigService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ReleaseConfig[]> {
    return this.http.get<ReleaseConfig[]>('/api/relconfig');
  }

  update(entity: ReleaseConfig): Observable<Object> {
    return this.http.put<Object>('/api/relconfig/' + entity.id, entity);
  }

  add(entity: ReleaseConfig): Observable<ReleaseConfig> {
    return this.http.post<ReleaseConfig>('/api/relconfig', entity);
  }

  delete(id: string): Observable<Object> {
    return this.http.delete<Object>('/api/relconfig/' + id);
  }

  deleteAll(ids: string[]): Observable<Object> {
    return this.http.post<Object>('/api/relconfig/delete', ids);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
