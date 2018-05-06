import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {DataManagerService} from '../../services/data-manager.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() posts: Post[];

  constructor(public dmService: DataManagerService) { }

  public onPostClick(post: Post): void {
    post._collapsed = !post._collapsed;
  }

  public onPostRemove(post: Post) {
    this.dmService.deletePost(post.id);
    this.dmService.posts
      .subscribe();
  }

  ngOnInit() {
  }

}
