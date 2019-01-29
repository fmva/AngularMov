import {Component, OnInit} from '@angular/core';
import {Results} from '../../resources/PopularMoviesInterface';
import {Favorites} from '../../utils/favorites';
import {Resources} from '../../resources/resources';
import {MainService} from '../../services/main.service';
import {Genres} from '../../utils/genres';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {

  favoriteMovies: Results[];
  spinner: boolean;
  error: string = null;
  title: string;
  movesNotFoundedText: string;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.spinner = true;
    if (Genres.getGenres()) {
      this.initComponent();
    } else {
      this.getGenres();
    }
  }

  /**
   * Initialize component
   */
  private initComponent(): void {
    this.title = Resources.getResources('favoritesLinkText');
    this.movesNotFoundedText = Resources.getResources('movesNotFounded');
    this.clickFavorites();
    this.spinner = false;
  }

  /**
   * Event click favorite button
   */
  clickFavorites() {
    this.favoriteMovies = Favorites.getFavorites();
  }

  /**
   * Get genres from server and save it locally
   */
  getGenres(): void  {
      this.mainService.getGenres()
        .subscribe(result => {
          Genres.setGenres(result);
          this.initComponent();
        });
  }
}
