interface SettingInterface {
  urlPopularMovies: string;
  urlGenres: string;
  urlSearch: string;
  urlDetails: string;
  urlRecommendations: string;
  urlCredits: string;
  urlImages: string;
  apiKey: string;
  language: string;
  paramLanguage: string;
  paramApiKey: string;
  paramPage: string;
  timeout:  number;
  favoriteStorage: string;
  mainLink: string;
  favoritesLink: string;
  detailsLink: string;
}

/** application settings  */
export const SETTINGS: SettingInterface = {
  urlPopularMovies: 'https://api.themoviedb.org/3/movie/popular',
  urlGenres: 'https://api.themoviedb.org/3/genre/movie/list',
  urlSearch: 'https://api.themoviedb.org/3/search/movie',
  urlDetails: 'https://api.themoviedb.org/3/movie',
  urlRecommendations: 'https://api.themoviedb.org/3/movie/{movie_id}/recommendations',
  urlCredits: 'https://api.themoviedb.org/3/movie/{movie_id}/credits',
  urlImages: 'https://image.tmdb.org/t/p/w500',
  apiKey: '22ff5aef4014cb5dc72ee01c851e667b',
  language: 'ru-RU',
  paramLanguage: 'language',
  paramApiKey: 'api_key',
  paramPage:  'page',
  timeout: 500,
  favoriteStorage: 'favorites',
  mainLink: '/main',
  favoritesLink: '/favorites',
  detailsLink: '/details'
};




