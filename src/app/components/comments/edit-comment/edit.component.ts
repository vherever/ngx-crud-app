import { Component, OnInit } from '@angular/core';
import {BasePopup, PopupService} from '../../../services/popup.service';
import {Comment} from '../../../models/comment';

export class EditCommentPopup extends BasePopup {
  data: any;
  constructor(data: any) {
    super('EditCommentPopup');
    this.data = data;
  }
}

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditCommentComponent implements OnInit {
  popup: EditCommentPopup;
  styleLeft: string;
  styleTop: string;
  overlayWidth: string;
  overlayHeight: string;
  window: any;

  public comment: Comment;

  constructor(private requestPopupService: PopupService) {
    this.window = window;
    this.requestPopupService.popup.subscribe(popup => this.checkPopup(popup));
  }

  private checkPopup(popup: BasePopup) {
    if (popup instanceof EditCommentPopup) {
      this.showPopup(popup as EditCommentPopup);
    }
  }

  private showPopup(popup: EditCommentPopup) {
    if (popup.data) {
      this.popup = popup;
      this.comment = popup.data;
      this.setOverlay();
      this.centerPopup();
    } else {
      console.log('Error: Not enough data');
    }
  }

  private setOverlay() {
    this.overlayHeight = this.window.innerHeight + 'px';
    this.overlayWidth = this.window.innerWidth + 'px';
  }

  private centerPopup() {
    this.styleTop = (this.window.innerHeight - 400) / 2 + 'px';
    this.styleLeft = (this.window.innerWidth - 400) / 2 + 'px';
  }

  public onCancelClick() {
    this.popup = undefined;
  }

  public onNotifyClose(value: boolean) {
    if (value) {
      setTimeout(() => {
        this.onCancelClick();
      }, 10);
    }
  }

  ngOnInit() {
  }

}
