import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../../models/comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() comments: Comment[];

  constructor() { }

  ngOnInit() {
  }

}
