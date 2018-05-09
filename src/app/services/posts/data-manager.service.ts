import { Injectable } from '@angular/core';
import {AjaxService} from '../ajax.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Post} from '../../models/post';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataManagerService {
  private requests: Subject<string>;
  private results: Post[];
  private _posts: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<Post>>([]);

  // We will subscribe to items in our component
  public posts: Observable<Array<Post>>;
  public posts_: Post[];

  constructor(private ajaxService: AjaxService) {
    this.posts = this._posts.asObservable();
  }

  public loadPosts() {
    this.requests = new Subject();
    this.requests.asObservable().subscribe(
      (url: string) => this.sendGetRequest(url),
      null,
      () => this.completeRequest()
    );
    this.requests.next('http://localhost:3000/posts/');
  }

  public addPost(data: any) {
    this.requests = new Subject();
    this.requests.asObservable().subscribe(
      (url: string) => this.sendPostRequest(url, data),
      null,
      () => this._posts.next(this.results)
    );
    this.requests.next('http://localhost:3000/posts/');
  }

  public deletePost(id: number) {
    this.requests = new Subject();
    this.requests.asObservable().subscribe(
      (url: string) => this.deletePostRequest(url, id),
      null,
      () => this._posts.next(this.results)
    );
    this.requests.next('http://localhost:3000/posts/');
  }

  public updatePost(post: Post) {
    this.requests = new Subject();
    this.requests.asObservable().subscribe(
      (url: string) => this.updatePostRequest(url, post),
      null,
      () => this._posts.next(this.results)
    );
    this.requests.next('http://localhost:3000/posts/' + post.id);
  }


  // GET
  private sendGetRequest(url: string): void {
    this.ajaxService.get(url)
      .subscribe((res: any) => {
        this.savePostResults(res);
        this.requests.complete();
      });
  }

  // POST
  private sendPostRequest(url: string, data: any): void {
    this.ajaxService.post(url, data)
      .subscribe((res: any) => {
        this.savePostResult(res);
        this.requests.complete();
      });
  }

  // DELETE
  private deletePostRequest(url: string, id: number) {
    this.ajaxService.delete(url, id)
      .subscribe(() => {
        this.results = this.results.filter(i => i.id !== id);
        this.requests.complete();
      });
  }

  // UPDATE
  private updatePostRequest(url: string, post: Post) {
    this.ajaxService.put(url, post)
      .subscribe((res) => {
        // Here we update visual representation only
        this.results = this.results.filter(i => i.id !== post.id);
        this.results.push(res);
        this.results.sort((a, b) => a.id - b.id);
        this.requests.complete();
      });
  }

  // Save all posts in temporary array
  private savePostResults(data: Post[]): void {
    this.results = data.map(item => {
      return new Post(
        item.author,
        item.title,
        item.body,
        item.image,
        item.date,
        false,
        item.id
      );
    });
  }

  // Add one post to temporary array
  private savePostResult(data: Post): void {
    this.results.push(
      new Post(
        data.author,
        data.title,
        data.body,
        data.image,
        data.date,
        false,
        data.id
      )
    );
  }

  private completeRequest(): void {
    this._posts.next(this.results);
  }
}
