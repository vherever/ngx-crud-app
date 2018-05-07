import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../../models/post';
import {DataManagerService} from '../../../services/posts/data-manager.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  @Input() current_post: Post;

  public postGroup: FormGroup;
  public model: Post;

  private post: Post;

  constructor(private dmService: DataManagerService, builder: FormBuilder) {

  }

  public addPostClick(): void {
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

  public onUpdatePost(post: Post) {
    console.log('model', this.model);
    console.log('this.postGroup', this.postGroup);
    this.dmService.updatePost(post);
  }

  ngOnInit() {
    this.formGroupControlsInit();

    this.model = {
      author: this.current_post ? this.current_post.author : '',
      title: this.current_post ? this.current_post.title : '',
      body: this.current_post ? this.current_post.body : '',
      _collapsed: this.current_post ? this.current_post._collapsed : false,
      id: this.current_post ? this.current_post.id : undefined
    };
  }

}
