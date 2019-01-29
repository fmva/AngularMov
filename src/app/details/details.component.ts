import {Component, OnInit} from '@angular/core';
import {Resources} from '../../resources/resources';
import {ActivatedRoute} from '@angular/router';
import {DetailsInterface, GenresDetailsInterface} from '../../resources/DetailsInterface';
import {DetailsService} from '../../services/details.service';
import {MainService} from '../../services/main.service';
import {forkJoin} from 'rxjs';
import {Genres} from '../../utils/genres';
import {Scroll} from '../../utils/scroll';
import {PopularMoviesInterface, Results} from '../../resources/PopularMoviesInterface';
import {GenresInterface} from '../../resources/GenresInterface';
import {SETTINGS} from '../../resources/settings';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  classNameElementScroll: string;
  spinner: boolean;
  error: string = null;
  title: string;
  urlImages: string;
  year: string;
  RecommendationTitle: string;

  recommendationMovies: PopularMoviesInterface;
  favoriteCard: Results;
  genres: GenresInterface;
  details: DetailsInterface;

  private currentPage: number;
  private id: number;
  private scrollCurrent: Scroll;

  constructor(private route: ActivatedRoute,
              private detailsService: DetailsService,
              private mainService: MainService) {

    route.params.subscribe(val => {
      this.id = +val.id;
      this.Initialize();
    });
  }

  ngOnInit() {

  }

  /**
   * Initialize component
   */
  private Initialize(): void {
    this.spinner = true;
    this.classNameElementScroll = 'main-center';
    this.title = Resources.getResources('detailsTitle');
    this.urlImages = SETTINGS.urlImages;
    this.RecommendationTitle = Resources.getResources('RecommendationTitle');

    const detailArray: Array<any> = [
      this.detailsService.getDetails(this.id),
      this.detailsService.getRecommendations(this.id)
    ];
    if (!Genres.getGenres()) {
      detailArray.push(this.mainService.getGenres());
    }

    forkJoin(detailArray).subscribe((results: any) => {
      this.details = results[0];
      this.recommendationMovies = results[1];
      this.year = (this.details.release_date) ? (`(${this.getYear(this.details.release_date)})`) : '';
      if (results[2]) {
        this.genres = results[2];
        Genres.setGenres(this.genres);
      }
      this.setFavoriteCard();
      document.getElementsByClassName(this.classNameElementScroll)[0].scrollTop = 0;
      this.currentPage = 1;
      this.scrollCurrent = new Scroll( this.currentPage );
      this.spinner = false;
    }, error => {
      this.error = error.message;
      this.spinner = false;
    });
  }

  /**
   * Create favorite card object
   */
  private setFavoriteCard(): void {
    this.favoriteCard = {
      poster_path:  this.details.poster_path ? this.details.poster_path : null,
      adult:        this.details.adult ? this.details.adult : null,
      overview: this.details.overview ? this.details.overview : null,
      release_date: this.details.release_date ? this.details.release_date : null,
      genre_ids: this.details.genres.length > 0 ? (
        this.details.genres.map (item => {
          return item.id;
        })
      ) : null,
      id: this.details.id ? this.details.id : null,
      original_title: this.details.original_title ? this.details.original_title : null,
      original_language: this.details.original_language ? this.details.original_language : null,
      title: this.details.title ? this.details.title : null,
      backdrop_path: this.details.backdrop_path ? this.details.backdrop_path : null,
      popularity: this.details.popularity ? this.details.popularity : null,
      vote_count: this.details.vote_count ? this.details.vote_count : null,
      video: this.details.video ? this.details.video : null,
      vote_average: this.details.vote_average ? this.details.vote_average : null
    };
  }

  /**
   * Get genre titles
   * @param genre_ids - list genres
   */
  getGenres(genre_ids: Array<GenresDetailsInterface>): Array<string> {
    const genres: Array<number> = genre_ids.map (item => {
      return item.id;
    });
    return Genres.getTitles(genres);
  }

  /**
   * get year from date
   * @param date - date like as "2018-09-14"
   */
  private getYear(date: string): string {
    return (date) ? (date.substr(0, 4 )) : '';
  }

  /**
   * Load data when user scrolls element
   * @param event - point to element with scroll
   */
  scroll(event) {

    this.currentPage = this.scrollCurrent.ScrollDown(
      this.recommendationMovies.total_pages,
      event.target.scrollTop,
      event.target.offsetHeight,
      event.target.scrollHeight,
      (page) => {
        this.spinner = true;
        this.detailsService.getRecommendations(this.id, page).subscribe((result: PopularMoviesInterface)  => {
          this.recommendationMovies.results = this.recommendationMovies.results.concat(result.results);
          this.spinner = false;
        }, error => {
          this.error = error.message;
          this.spinner = false;
        });
      }
    );
  }

}
