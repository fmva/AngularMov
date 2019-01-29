import {Component, OnInit, Input} from '@angular/core';
import {Resources} from '../../resources/resources';
import {SETTINGS} from '../../resources/settings';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent implements OnInit {
  @Input() title: string;
  mainLinkText: string;
  mainLink: string;
  favoritesLinkText: string;
  favoritesLink: string;

  constructor() { }

  ngOnInit() {
    this.mainLink = SETTINGS.mainLink;
    this.favoritesLink = SETTINGS.favoritesLink;
    this.mainLinkText = Resources.getResources('mainLinkText');
    this.favoritesLinkText = Resources.getResources('favoritesLinkText');
  }
}
