import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {
  public filterText: string;
  public filterTextComment: string;

  constructor() { }

  public onNotifyFilter(message: string): void {
    this.filterText = message;
  }

  public onNotifyFilterComment(message: string): void {
    this.filterTextComment = message;
  }

}
