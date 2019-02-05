import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SETTINGS} from '../resources/settings';
import {DetailsInterface} from '../resources/DetailsInterface';
import {PopularMoviesInterface} from '../resources/PopularMoviesInterface';
import {CreditsInterface} from '../resources/CreditsInterface';

@Injectable({ providedIn: 'root' })

export class DetailsService {

  constructor(
    private http: HttpClient) { }

  /**
   * Request to server for details' movie
   * @param id - identifier of movie
   */
  getDetails(id: number) {
    const options = {
      params: new HttpParams()
        .set(SETTINGS.paramApiKey, SETTINGS.apiKey)
        .set(SETTINGS.paramLanguage, SETTINGS.language)
    };
    return this.http.get<DetailsInterface>(SETTINGS.urlDetails + '/' + id.toString(), options);
  }

  /**
   * Request to server for recommendations' movie
   * @param id - identifier of movie
   * @param page - number of page
   */
  getRecommendations(id: number, page: number = 1) {
    const options = {
      params: new HttpParams()
        .set(SETTINGS.paramApiKey, SETTINGS.apiKey)
        .set(SETTINGS.paramLanguage, SETTINGS.language)
        .set(SETTINGS.paramPage, page.toString())
    };
    return this.http.get<PopularMoviesInterface>(SETTINGS.urlRecommendations.replace('{movie_id}', id.toString()) , options);
  }

  /**
   * Request to server for credits' movie
   * @param id - identifier of movie
  */
  getCredits(id: number) {
    const options = {
      params: new HttpParams()
        .set(SETTINGS.paramApiKey, SETTINGS.apiKey)
    };
    return this.http.get<CreditsInterface>(SETTINGS.urlCredits.replace('{movie_id}', id.toString()) , options);
  }

}
