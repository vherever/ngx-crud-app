import { Injectable } from '@angular/core';
import {AjaxService} from './ajax.service';

@Injectable()
export class DataManagerService {

  constructor(private ajaxService: AjaxService) { }

  public getPosts() {
    console.log('dd', this.ajaxService.get('http://localhost:3000/posts'));
    return this.ajaxService.get('http://localhost:3000/posts');
  }

  public addPost(data: any) {
    console.log('data', data);
    return this.ajaxService.post('http://localhost:3000/posts', data)
      .subscribe(res => {
        console.log('res', res);
      });
  }
}
