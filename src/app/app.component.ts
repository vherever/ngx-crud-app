import {Component, OnInit} from '@angular/core';
import {DataManagerService} from './services/data-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dmService: DataManagerService) {
  }

  public posts: any[];

  ngOnInit() {
    console.log('main init');

    this.dmService.getPosts().subscribe((res: any) => {
      this.posts = res;
    });
  }
}
