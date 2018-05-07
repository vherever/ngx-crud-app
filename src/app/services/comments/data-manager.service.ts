import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AjaxService} from '../ajax.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Comment} from '../../models/comment';

@Injectable()
export class DataManagerCommentsService {
  private requests: Subject<string>;
  private results: Comment[];
  private _comments: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<Comment>>([]);

  // We will subscribe to items in our component
  public comments: Observable<Array<Comment>>;
  public comments_: Comment[];

  constructor(private ajaxService: AjaxService) {
    this.comments = this._comments.asObservable();
  }

  public loadComments() {
    this.requests = new Subject();
    this.requests.asObservable().subscribe(
      (url: string) => this.sendGetRequest(url),
      null,
      () => this.completeRequest()
    );
    this.requests.next('http://localhost:3000/comments/');
  }

  // GET
  private sendGetRequest(url: string): void {
    this.ajaxService.get(url)
      .subscribe((res: any) => {
        this.saveCommentResults(res);
        this.requests.complete();
      });
  }

  // Save all posts in temporary array
  private saveCommentResults(data: Comment[]): void {
    this.results = data.map(item => {
      return new Comment(
        item.author,
        item.email,
        item.body,
        item.id,
        item.postId
      );
    });
  }

  private completeRequest(): void {
    this._comments.next(this.results);
  }

}
