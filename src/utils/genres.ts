import {GenresInterface, GenresItemInterface} from '../resources/GenresInterface';

let dataGenres: GenresInterface = null;

/** Class work with genre data */
export class Genres {

  /**
   * save genre data to local param
   * @param data - genre data
   */
  static setGenres(data) {
    dataGenres = data;
  }

  /**
   * get genre data from local param
   */
  static getGenres(): GenresInterface {
    return dataGenres;
  }

  /**
   * get genre list like as strings
   * @param genresId - list genre id
   */
  static getTitles(genresId: Array<number>): Array<string> {
    if (!dataGenres) {
      return null;
    }
    return genresId.map((item) => {
      const data: GenresItemInterface = dataGenres.genres.find((item_gen) => {
        return item_gen.id === item;
      });
      return data.name;
    });
  }
}
