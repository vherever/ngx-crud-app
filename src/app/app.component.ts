import {Component, OnInit} from '@angular/core';
import {DataManagerService} from './services/data-manager.service';
import {Post} from './models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dmService: DataManagerService) {
  }

  public posts: Post[];

  ngOnInit() {
    this.dmService.loadPosts();
    this.dmService.posts.subscribe((items) => {
      this.dmService.posts_ = items;
      this.posts = items;
    });
  }
}
