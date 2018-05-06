import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { PostComponent } from './components/posts/post/post.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { AddCommentComponent } from './components/comments/add-comment/add-comment.component';
import {AjaxService} from './services/ajax.service';
import {DataManagerService} from './services/data-manager.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    CommentsComponent,
    CommentComponent,
    PostComponent,
    AddPostComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    AjaxService,
    DataManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
