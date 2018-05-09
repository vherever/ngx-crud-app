import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class HelperService {

  constructor() { }

  public getCurrentDate() {
    return moment().format('LLL');
  }

}
