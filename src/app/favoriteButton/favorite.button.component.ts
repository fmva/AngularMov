import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Resources} from '../../resources/resources';
import {Results} from '../../resources/PopularMoviesInterface';
import {Favorites} from '../../utils/favorites';

@Component({
  selector: 'app-favorite-button',
  templateUrl: 'favorite.button.component.html',
  styleUrls: ['favorite.button.component.css']
})

export class FavoriteButtonComponent implements OnInit {
  @Output() clickBtn: EventEmitter<any> = new EventEmitter();

  ButtonClassName = {
    Favorites : 'favorite-button',
    Remove : 'remove-button'
  };

  @Input() card: Results;
  addFavoriteText: string;
  className: string;
  addFavoriteTitle: string;

  constructor() { }

  ngOnInit() {
   this.className = this.ButtonClassName.Favorites;
   this.addFavoriteTitle = Resources.getResources('favoritesLinkText');

   const favoriteCard: Results = Favorites.getFavoritesByID(this.card.id);
   this.changeFavoriteButton((favoriteCard) ? (true) : (false));
  }

  /**
   * Change styles favorite button
   * @param favoriteCard - set add or remove styles for button
   */
  changeFavoriteButton(favoriteCard: boolean) {
    if (favoriteCard) {
      this.className = this.ButtonClassName.Remove;
      this.addFavoriteText = Resources.getResources('removeFavorite');
    } else {
      this.className = this.ButtonClassName.Favorites;
      this.addFavoriteText = Resources.getResources('addFavorite');
    }
  }

  /**
   * Event click favorite button
   */
  clickEvent() {
    const favoriteCard: Results = Favorites.getFavoritesByID(this.card.id);
    this.changeFavoriteButton( (favoriteCard) ? (false) : (true) );
    if (favoriteCard) {
      Favorites.removeFavorite(this.card);
    } else {
      Favorites.pushFavorite(this.card);
    }
    this.clickBtn.emit();
  }

}
