import {Component, OnInit, HostListener, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

@HostListener('scroll', ['$event']) // for window scroll events

export class MainComponent implements OnInit {
  @Input() title: boolean;
  @Input() spinner: boolean;
  @Input() dialogError: boolean;
  @Output() scrollChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {}

  /**
   * Event scroll
   * @param event - object points to element DOM with scroll
   */
  onScrollChange(event) {
    this.scrollChange.emit(event);
  }

}
