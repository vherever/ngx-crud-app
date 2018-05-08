import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {DataManagerService} from '../../services/posts/data-manager.service';
import {DataManagerCommentsService} from '../../services/comments/data-manager.service';
import {Comment} from '../../models/comment';
import {PopupService} from '../../services/popup.service';
import {EditPostPopup} from './edit-post/edit.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() posts: Post[];

  // Here we put only comments by postId
  public comments: Comment[];

  public filterText: string;

  constructor(
    private dmService: DataManagerService,
    private dmCommentsService: DataManagerCommentsService,
    private popupService: PopupService) { }

  public onPostClick(post: Post): void {
    post._collapsed = !post._collapsed;
    this.comments = this.dmCommentsService.findCommentsByPostId(post.id);
  }

  public onPostRemove(post: Post): void {
    this.dmService.deletePost(post.id);
  }

  public onEditClick(post: Post): void {
    const popup = new EditPostPopup(post);
    this.popupService.showPopup(popup);
  }

  onNotifyFilter(message: string): void {
    this.filterText = message;
  }

  ngOnInit() {
  }

}
