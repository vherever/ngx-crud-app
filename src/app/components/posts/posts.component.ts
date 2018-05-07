import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {DataManagerService} from '../../services/posts/data-manager.service';
import {DataManagerCommentsService} from '../../services/comments/data-manager.service';
import {Comment} from '../../models/comment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() posts: Post[];

  // Here we put only comments by postId
  public comments: Comment[];

  constructor(private dmService: DataManagerService, private dmCommentsService: DataManagerCommentsService) { }

  public onPostClick(post: Post): void {
    post._collapsed = !post._collapsed;
    this.comments = this.dmCommentsService.findCommentsByPostId(post.id);
  }

  public onPostRemove(post: Post) {
    this.dmService.deletePost(post.id);
    this.dmService.posts
      .subscribe();
  }

  ngOnInit() {
  }

}
