import { Component, OnInit, Input } from '@angular/core';
import { Resources } from '../../resources/resources';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.css']
})

export class DialogComponent implements OnInit {
  @Input() visible: boolean;
  @Input() text: string;
  errorHeaderDialogText: string;

  constructor() { }

  ngOnInit() {
    this.errorHeaderDialogText = Resources.getResources('errorHeaderDialog');
  }
}
