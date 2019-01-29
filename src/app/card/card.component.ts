import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Results} from '../../resources/PopularMoviesInterface';
import {Genres} from '../../utils/genres';
import {SETTINGS} from '../../resources/settings';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  @Input() cards: Results[];
  @Output() clickBtnFavorites: EventEmitter<any> = new EventEmitter();

  urlImages: string;
  detailsLink: string;

  constructor() { }

  ngOnInit() {
    this.detailsLink = SETTINGS.detailsLink;
    this.urlImages = SETTINGS.urlImages;
  }

  /**
   * Get genre titles
   * @param genre_ids - list genres
   */
  getGenres(genre_ids: Array<number>): Array<string> {
    return Genres.getTitles(genre_ids);
  }

  /**
   * Event click to button favorite
   */
  clickFavorites() {
    this.clickBtnFavorites.emit();
  }

}
