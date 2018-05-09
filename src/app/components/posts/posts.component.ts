import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../models/post';
import {DataManagerService} from '../../services/posts/data-manager.service';
import {DataManagerCommentsService} from '../../services/comments/data-manager.service';
import {Comment} from '../../models/comment';
import {PopupService} from '../../services/popup.service';
import {EditPostPopup} from './edit-post/edit.component';
import {FilterService} from '../../services/filter.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() posts: Post[];
  @Output() notifyPosts: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Here we put only comments by postId
  public comments: Comment[];

  // Save here temporary state
  public _collapsed: boolean;

  constructor(
    private dmService: DataManagerService,
    private dmCommentsService: DataManagerCommentsService,
    private popupService: PopupService,
    public filterService: FilterService
  ) { }

  public onPostClick(post: Post): void {
    this._collapsed = true;
    this.notifyPosts.emit(true);
    post._collapsed = !post._collapsed;
    this.comments = this.dmCommentsService.findCommentsByPostId(post.id);
  }

  public onPostClickHide(post: Post): void {
    this._collapsed = false;
    post._collapsed = !post._collapsed;
  }

  public onPostRemove(post: Post): void {
    this.dmService.deletePost(post.id);
  }

  public onEditClick(post: Post): void {
    const popup = new EditPostPopup(post);
    this.popupService.showPopup(popup);
  }

  ngOnInit() {
  }

}
