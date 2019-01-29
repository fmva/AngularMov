import {Results} from '../resources/PopularMoviesInterface';
import {SETTINGS} from '../resources/settings';

let favorites: Results[] = null;

/** Class work with favorites data */
export class Favorites {

  /**
   * get all favorites data
   */
  static getFavorites(): Results[] {
    if (favorites) {
      return favorites;
    }

    const localFavorites: string = localStorage.getItem(SETTINGS.favoriteStorage);

    if (localFavorites) {
      favorites = JSON.parse(localFavorites);
    } else {
      favorites = [];
    }

    return favorites;
  }

  /**
   * Get favorite data by id
   * @param id - id of movie
   */
  static getFavoritesByID(id: number): Results {
    if (!favorites) {
      favorites = this.getFavorites();
    }

    return favorites.find( item => {
      return id === item.id;
    });
  }

  /**
   * Push favorite data to local storage
   * @param card - card object
   */
  static pushFavorite(card: Results) {
    if (!favorites) {
      favorites = this.getFavorites();
    }
    favorites.push(card);
    localStorage.setItem(SETTINGS.favoriteStorage, JSON.stringify(favorites));
  }

  /**
   * Remove favorite data from local storage
   * @param card - card object
   */
  static removeFavorite(card: Results) {
    if (!favorites) {
      favorites = this.getFavorites();
    }
    favorites = favorites.filter( item => {
      return (card.id !== item.id);
    });
    localStorage.setItem(SETTINGS.favoriteStorage, JSON.stringify(favorites));
  }
}
