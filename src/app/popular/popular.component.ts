import {Component, OnInit} from '@angular/core';
import {MainService} from '../../services/main.service';
import {PopularMoviesInterface} from '../../resources/PopularMoviesInterface';
import {GenresInterface} from '../../resources/GenresInterface';
import {Genres} from '../../utils/genres';
import {Scroll} from '../../utils/scroll';
import {SETTINGS} from '../../resources/settings';
import {Resources} from '../../resources/resources';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-popular',
  templateUrl: 'popular.component.html',
  styleUrls: ['popular.component.css']
})

export class PopularComponent implements OnInit {
  popularMovies: PopularMoviesInterface;
  genres: GenresInterface;
  title: string = null;
  error: string = null;
  spinner: boolean;
  movesNotFoundedText: string;

  private queryValue: string = null;
  private currentPage: number;
  private timeOut: any;
  private scrollCurrent: Scroll;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.currentPage = 1;
    this.title = Resources.getResources('mainLinkText');
    this.movesNotFoundedText = Resources.getResources('movesNotFounded');
    this.scrollCurrent = new Scroll( this.currentPage );

    const popularArray: Array<any> = [
      this.mainService.getPopularMovies()
    ];
    if (!Genres.getGenres()) {
      popularArray.push(this.mainService.getGenres());
    }

    this.spinner = true;
    forkJoin(popularArray).subscribe((results: any) => {
      this.popularMovies = results[0];
      if (results[1]) {
        this.genres = results[1];
        Genres.setGenres(this.genres);
      }
      this.spinner = false;
    }, error => {
      this.error = error.message;
      this.spinner = false;
    });
  }

  /**
   * Find movies to API service if value is not null
   * @param value - searched value
   */
  search(value) {
    clearTimeout(this.timeOut);
    this.queryValue = (value) ? (value) : null;

    this.timeOut = setTimeout(() => {
      this.spinner = true;
      this.currentPage = 1;

      if (this.queryValue) {
        this.mainService.getSearch(value).subscribe(result => {
          this.popularMovies = result;
          this.spinner = false;
        }, error => {
          this.error = error.message;
          this.spinner = false;
        });
      } else {
        this.mainService.getPopularMovies().subscribe(result => {
          this.popularMovies = result;
          this.spinner = false;
        }, error => {
          this.error = error.message;
          this.spinner = false;
        });
      }
    }, SETTINGS.timeout);
  }

  /**
   * Event scroll
   * @param event - object points to element DOM with scroll
   */
  scroll(event) {
    this.currentPage = this.scrollCurrent.ScrollDown(
      this.popularMovies.total_pages,
      event.target.scrollTop,
      event.target.offsetHeight,
      event.target.scrollHeight,
      (page) => {
        this.spinner = true;
        if (this.queryValue) {
          this.mainService.getSearch(this.queryValue, page).subscribe((result: PopularMoviesInterface)  => {
            this.popularMovies.results = this.popularMovies.results.concat(result.results);
            this.spinner = false;
          }, error => {
            this.error = error.message;
            this.spinner = false;
          });
        } else {
          this.mainService.getPopularMovies(page)
            .subscribe((result: PopularMoviesInterface) => {
              this.popularMovies.results = this.popularMovies.results.concat(result.results);
              this.spinner = false;
            }, error => {
              this.error = error.message;
              this.spinner = false;
            });
        }
      }
    );
  }

}
