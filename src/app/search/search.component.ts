import { Component, OnInit, EventEmitter,  Output } from '@angular/core';
import { Resources } from '../../resources/resources';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})

export class SearchComponent implements OnInit {
  @Output() search: EventEmitter<any> = new EventEmitter();
  searchFieldText: string;

  constructor() { }

  ngOnInit() {
    this.searchFieldText = Resources.getResources('searchField');
  }

  /**
   * Event search input field
   * @param val - value input field
   */
  onSearchChange(val: string) {
    this.search.emit(val);
  }


}
