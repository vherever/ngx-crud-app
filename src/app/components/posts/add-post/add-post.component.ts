import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../../models/post';
import {DataManagerService} from '../../../services/data-manager.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  public postGroup: FormGroup;
  private post: Post;

  constructor(private dmService: DataManagerService) {
  }

  addPostClick(): void {
    if (this.postGroup.valid) {
      this.post = this.postGroup.value;
      this.dmService.addPost(this.post);
      this.dmService.posts.subscribe();

      // Clear the form
      this.formGroupControlsInit();
    }
  }

  get author() { return this.postGroup.get('author'); }
  get title() { return this.postGroup.get('title'); }
  get body() { return this.postGroup.get('body'); }

  private formGroupControlsInit() {
    this.postGroup = new FormGroup({
      author: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.formGroupControlsInit();
  }

}
