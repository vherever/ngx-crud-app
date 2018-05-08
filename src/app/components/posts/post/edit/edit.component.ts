import { Component, OnInit } from '@angular/core';
import {BasePopup, PopupService} from '../../../../services/popup.service';
import {Post} from '../../../../models/post';

export class EditPostPopup extends BasePopup {
  data: any;
  constructor(data: any) {
    super('EditPostPopup');
    this.data = data;
  }
}

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditPostComponent implements OnInit {
  popup: EditPostPopup;
  styleLeft: string;
  styleTop: string;
  overlayWidth: string;
  overlayHeight: string;
  window: any;

  public post: Post;

  constructor(private requestPopupService: PopupService) {
    this.window = window;
    this.requestPopupService.popup.subscribe(popup => this.checkPopup(popup));
  }

  private checkPopup(popup: BasePopup) {
    if (popup instanceof EditPostPopup) {
      this.showPopup(popup as EditPostPopup);
    }
  }

  private showPopup(popup: EditPostPopup) {
    if (popup.data) {
      this.popup = popup;
      this.post = popup.data;
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
