import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { AddCommentComponent } from './components/comments/add-comment/add-comment.component';
import {AjaxService} from './services/ajax.service';
import {DataManagerService} from './services/posts/data-manager.service';
import {DataManagerCommentsService} from './services/comments/data-manager.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {PopupService} from './services/popup.service';
import { EditPostComponent } from './components/posts/edit-post/edit.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterComponent } from './components/filter/filter.component';
import {EditCommentComponent} from './components/comments/edit-comment/edit.component';
import {FilterService} from './services/filter.service';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    CommentsComponent,
    AddPostComponent,
    AddCommentComponent,
    EditPostComponent,
    FilterPipe,
    FilterComponent,
    EditCommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AjaxService,
    DataManagerService,
    DataManagerCommentsService,
    PopupService,
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
