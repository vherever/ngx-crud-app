import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../models/comment';
import {DataManagerCommentsService} from '../../services/comments/data-manager.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() postId: number;

  constructor(private dmCommentsService: DataManagerCommentsService) { }

  public onNotifyCommentsUpdate(postId: number): void {
    this.comments = this.dmCommentsService.findCommentsByPostId(postId);
  }

  ngOnInit() { }

}
