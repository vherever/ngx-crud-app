import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataManagerCommentsService} from '../../../services/comments/data-manager.service';
import {Comment} from '../../../models/comment';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit, OnDestroy {
  @Input() postId: string;
  @Input() current_comment: Comment;
  @Output() notifyCommentsUpdate: EventEmitter<number> = new EventEmitter<number>();
  @Output() notifyClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  public commentGroup: FormGroup;
  public model: Comment;
  public emailPattern: string;

  private comment: any;
  private subscription: ISubscription;

  constructor(private dmService: DataManagerCommentsService) { }

  public addCommentClick(): void {
    if (this.commentGroup.valid) {
      this.comment = this.commentGroup.value;
      Object.assign(this.comment, {postId: this.postId});
      this.dmService.addComment(this.comment);

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
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      body: new FormControl('', Validators.required)
    });
  }

  public onUpdateComment(comment: Comment) {
    this.dmService.updateComment(comment);
    this.notifyCommentsUpdate.emit(parseInt(this.postId, 10));
    this.notifyClose.emit(true);
  }

  ngOnInit() {
    this.subscription = this.dmService.comments.subscribe(() => {
      this.notifyCommentsUpdate.emit(parseInt(this.postId, 10));
    });
    this.formGroupControlsInit();
    this.emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    this.model = {
      author: this.current_comment ? this.current_comment.author : '',
      email: this.current_comment ? this.current_comment.email : '',
      body: this.current_comment ? this.current_comment.body : '',
      id: this.current_comment ? this.current_comment.id : undefined,
      postId: this.current_comment ? this.current_comment.postId : undefined
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
