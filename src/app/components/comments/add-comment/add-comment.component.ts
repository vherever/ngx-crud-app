import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  public commentGroup: FormGroup;
  private comment: any;

  constructor() { }

  public addCommentClick(): void {
    if (this.commentGroup.valid) {
      this.comment = this.commentGroup.value;
      // this.dmService.addComment(this.comment);
      // this.dmService.comments.subscribe();

      // Clear the form
      this.formGroupControlsInit();
    }
  }

  get name_control() { return this.commentGroup.get('name'); }
  get comment_control() { return this.commentGroup.get('comment'); }

  private formGroupControlsInit() {
    this.commentGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.formGroupControlsInit();
  }

}
