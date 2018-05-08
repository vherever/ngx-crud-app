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
  public comments_: Comment[]; // We use it as a storage for comments

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

  public addComment(data: any) {
    this.requests = new Subject();
    this.requests.asObservable().subscribe(
      (url: string) => this.sendCommentRequest(url, data),
      null,
      () => this._comments.next(this.results)
    );
    this.requests.next('http://localhost:3000/comments/');
  }

  public deleteComment(id: number) {
    this.requests = new Subject();
    this.requests.asObservable().subscribe(
      (url: string) => this.deleteCommentRequest(url, id),
      null,
      () => this._comments.next(this.results)
    );
    this.requests.next('http://localhost:3000/comments/');
  }

  public updateComment(comment: Comment) {
    this.requests = new Subject();
    this.requests.asObservable().subscribe(
      (url: string) => this.updateCommentRequest(url, comment),
      null,
      () => this._comments.next(this.results)
    );
    this.requests.next('http://localhost:3000/comments/' + comment.id);
  }

  // GET
  private sendGetRequest(url: string): void {
    this.ajaxService.get(url)
      .subscribe((res: any) => {
        this.saveCommentResults(res);
        this.requests.complete();
      });
  }

  // POST
  private sendCommentRequest(url: string, data: any): void {
    this.ajaxService.post(url, data)
      .subscribe((res: any) => {
        this.saveCommentResult(res);
        this.requests.complete();
      });
  }

  // DELETE
  private deleteCommentRequest(url: string, id: number) {
    this.ajaxService.delete(url, id)
      .subscribe(() => {
        this.results = this.results.filter(i => i.id !== id);
        this.requests.complete();
      });
  }

  // UPDATE
  private updateCommentRequest(url: string, comment: Comment) {
    this.ajaxService.put(url, comment)
      .subscribe((res) => {
        // Here we update visual representation only
        this.results = this.results.filter(i => i.id !== comment.id);
        this.results.push(res);
        this.results.sort((a, b) => a.id - b.id);
        this.requests.complete();
      });
  }

  // Save all comments in temporary array
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

  // Add one comment to temporary array
  private saveCommentResult(item: Comment): void {
    this.results.push(
      new Comment(
        item.author,
        item.email,
        item.body,
        item.id,
        item.postId
      )
    );
  }

  private completeRequest(): void {
    this._comments.next(this.results);
  }

  public findCommentsByPostId(postId: number): Comment[] {
    return this.comments_.filter((i) => {
      return postId === parseInt(i.postId, 10);
    });
  }

}
