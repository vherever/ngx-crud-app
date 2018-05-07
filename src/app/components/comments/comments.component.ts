import {Component, Input, OnInit} from '@angular/core';
import {DataManagerCommentsService} from '../../services/comments/data-manager.service';
import {Comment} from '../../models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  public comments: Comment[];

  constructor(private dmService: DataManagerCommentsService) { }

  ngOnInit() {
    /*
    this.dmService.loadComments();
    this.dmService.comments.subscribe((items) => {
      this.dmService.comments_ = items;
      this.comments = items;
    });
    */
  }

}
