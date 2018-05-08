import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public enableFilter: boolean;
  public filterPlaceholder: string;
  public filterInput = new FormControl();

  @Output() notifyFilter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.enableFilter = true;
    this.filterPlaceholder = 'Filter..';

    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
        this.notifyFilter.emit(term);
      });
  }

}
