import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export class BasePopup {
  typeName: string;

  constructor(typeName: string) {
    this.typeName = typeName;
  }
}

@Injectable()
export class PopupService {
  private _popup: Subject<BasePopup>;
  public popup: Observable<BasePopup>;

  constructor() {
    this._popup = new Subject<BasePopup>();
    this.popup = this._popup.asObservable();
  }

  showPopup(popup: BasePopup) {
    this._popup.next(popup);
  }
}
