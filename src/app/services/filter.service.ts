import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {
  public filterText: string;

  constructor() { }

  public onNotifyFilter(message: string): void {
    this.filterText = message;
  }

}
