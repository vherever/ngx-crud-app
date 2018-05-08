import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataManagerCommentsService} from '../../../services/comments/data-manager.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  public commentGroup: FormGroup;
  @Input() postId: string;
  @Output() notifyCommentsUpdate: EventEmitter<number> = new EventEmitter<number>();
  private comment: any;

  constructor(private dmService: DataManagerCommentsService) { }

  public addCommentClick(): void {
    if (this.commentGroup.valid) {
      this.comment = this.commentGroup.value;
      Object.assign(this.comment, {postId: this.postId});
      this.dmService.addComment(this.comment);
      this.dmService.comments.subscribe(() => {
        this.notifyCommentsUpdate.emit(parseInt(this.postId, 10));
      });

      // Clear the form
      this.formGroupControlsInit();
    }
  }

  get author() { return this.commentGroup.get('author'); }
  get email() { return this.commentGroup.get('email'); }
  get body() { return this.commentGroup.get('body'); }

  private formGroupControlsInit() {
    this.commentGroup = new FormGroup({
      author: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.formGroupControlsInit();
  }

}
