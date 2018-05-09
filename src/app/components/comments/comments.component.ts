import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../models/comment';
import {DataManagerCommentsService} from '../../services/comments/data-manager.service';
import {PopupService} from '../../services/popup.service';
import {EditCommentPopup} from './edit-comment/edit.component';
import {FilterService} from '../../services/filter.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() postId: number;

  constructor(
    private dmCommentsService: DataManagerCommentsService,
    private popupService: PopupService,
    public filterService: FilterService
  ) { }

  public onNotifyCommentsUpdate(postId: number): void {
    this.comments = this.dmCommentsService.findCommentsByPostId(postId);
  }

  public onCommentRemove(comment: Comment): void {
    this.dmCommentsService.deleteComment(comment.id);
    this.onNotifyCommentsUpdate(this.postId);
  }

  public onEditClick(comment: Comment): void {
    const popup = new EditCommentPopup(comment);
    this.popupService.showPopup(popup);
  }

  ngOnInit() {}

}
