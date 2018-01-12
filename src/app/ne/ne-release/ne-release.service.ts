import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {NeRelease} from './ne-release';

@Injectable()
export class NeReleaseService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<NeRelease[]> {
    return this.http.get<NeRelease[]>('/api/nerel');
  }

  update(neRel: NeRelease): Observable<Object> {
    return this.http.put<Object>('/api/nerel/' + neRel.id, neRel);
  }

  add(neRel: NeRelease): Observable<NeRelease> {
    return this.http.post<NeRelease>('/api/nerel', neRel);
  }

  delete(id: string): Observable<Object> {
    return this.http.delete<Object>('/api/nerel/' + id);
  }

  deleteAll(ids: string[]): Observable<Object> {
    return this.http.post<Object>('/api/nerel/delete', ids);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
