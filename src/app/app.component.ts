import {Component, OnInit} from '@angular/core';
import {DataManagerService} from './services/posts/data-manager.service';
import {Post} from './models/post';
import {DataManagerCommentsService} from './services/comments/data-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dmService: DataManagerService, private dmCommentsService: DataManagerCommentsService) {}

  public posts: Post[];

  ngOnInit() {
    this.dmService.loadPosts();
    this.dmService.posts.subscribe((items) => {
      this.dmService.posts_ = items;
      this.posts = items;
    });

    this.dmCommentsService.loadComments();
    this.dmCommentsService.comments.subscribe((items) => {
      this.dmCommentsService.comments_ = items;
    });
  }
}
