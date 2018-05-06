import { Injectable } from '@angular/core';
import {AjaxService} from './ajax.service';

@Injectable()
export class DataManagerService {

  constructor(private ajaxService: AjaxService) { }

  public getPosts() {
    console.log('dd', this.ajaxService.get('http://localhost:3000/posts'));
    return this.ajaxService.get('http://localhost:3000/posts');
  }
}
