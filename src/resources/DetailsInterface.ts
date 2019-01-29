export interface GenresDetailsInterface {
  id?: number;
  name?: string;
}

export interface ProductionCompaniesDetailsInterface {
  id?: number;
  name?: string;
  logo_path?: string;
  origin_country?: string;
}

export interface ProductionCountriesDetailsInterface {
  iso_3166_1?: string;
  name?: string;
}

export interface SpokenLanguagesDetailsInterface {
  iso_639_1?: string;
  name?: string;
}

export interface DetailsInterface {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: any;
  budget?: number;
  genres?:  Array<GenresDetailsInterface>;
  homepage?: string;
  id?: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: Array<ProductionCompaniesDetailsInterface>;
  production_countries?: Array<ProductionCountriesDetailsInterface>;
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: Array<SpokenLanguagesDetailsInterface>;
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
