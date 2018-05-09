import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class HelperService {

  constructor() { }

  public getCurrentDate() {
    return moment().format('LLL');
  }

  public minifyText(str: string, max: number) {
    const splitted = str.split(' ').join('');
    return splitted.length > max ? splitted.slice(0, max) + ' ...' : str;
  }

  public getRandomColor() {
    const colors = ['#f1c40f', '#e67e22', '#e74c3c', '#16a085', '#27ae60', '#2980b9', '#9b59b6', '#34495e'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

}
