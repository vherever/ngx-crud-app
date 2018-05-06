import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AjaxService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

}
