import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SETTINGS} from '../resources/settings';
import {PopularMoviesInterface} from '../resources/PopularMoviesInterface';
import {GenresInterface} from '../resources/GenresInterface';

@Injectable({ providedIn: 'root' })

export class MainService {

  constructor(
    private http: HttpClient) { }

  /**
   * Request to server for popular movies
   * @param page - number of page
   */
  getPopularMovies(page: number = 1) {
      const options = {
        params: new HttpParams()
          .set(SETTINGS.paramApiKey, SETTINGS.apiKey)
          .set(SETTINGS.paramLanguage, SETTINGS.language)
          .set(SETTINGS.paramPage, page.toString())
      };
      return this.http.get<PopularMoviesInterface>(SETTINGS.urlPopularMovies, options);
    }

  /**
   * Request to server for genres of movie
   */
  getGenres() {
    const options = {
      params: new HttpParams()
        .set(SETTINGS.paramApiKey, SETTINGS.apiKey)
        .set(SETTINGS.paramLanguage, SETTINGS.language)
    };
    return this.http.get<GenresInterface>(SETTINGS.urlGenres, options);
  }

  /**
   * Request to server by search value
   * @param value - searched value
   * @param page - number of page
   */
  getSearch(value: string, page: number = 1) {
    const options = {
      params: new HttpParams()
        .set(SETTINGS.paramApiKey, SETTINGS.apiKey)
        .set(SETTINGS.paramLanguage, SETTINGS.language)
        .set(SETTINGS.paramPage, page.toString())
        .set('query', value)
    };
    return this.http.get<PopularMoviesInterface>(SETTINGS.urlSearch, options);
  }
}
