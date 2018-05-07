import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AjaxService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  delete(url: string, id: number): Observable<any> {
    return this.http.delete(url + id);
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(url, data);
  }

}
