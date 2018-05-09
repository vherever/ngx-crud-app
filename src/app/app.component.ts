import {Component, OnInit} from '@angular/core';
import {DataManagerService} from './services/posts/data-manager.service';
import {Post} from './models/post';
import {DataManagerCommentsService} from './services/comments/data-manager.service';
import {FilterService} from './services/filter.service';
import {Comment} from './models/comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private dmService: DataManagerService,
    private dmCommentsService: DataManagerCommentsService,
    public filterService: FilterService
  ) {}

  public posts: Post[];
  public comments: any;

  public onPostsNotify(state: boolean) {
    this.setAllPostsCollapsedFalse();
  }

  private setAllPostsCollapsedFalse() {
    this.posts.forEach((i: Post) => {
      i._collapsed = false;
    });
  }

  ngOnInit() {
    this.dmService.loadPosts();
    this.dmService.posts.subscribe((items: Post[]) => {
      this.dmService.posts_ = items;
      this.posts = items;
    });

    this.dmCommentsService.loadComments();
    this.dmCommentsService.comments.subscribe((items: Comment[]) => {
      this.dmCommentsService.comments_ = items;
      this.comments = items;
    });
  }
}
