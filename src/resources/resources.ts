const resources: object = {
  movesNotFounded: 'Фильмы не найдены!',
  searchField: 'Поиск',
  errorHeaderDialog: 'Ошибка',
  addFavorite: 'Добавить',
  removeFavorite: 'Удалить',
  mainLinkText: 'Главная',
  favoritesLinkText: 'Избранное',
  detailsTitle: 'Подробнее',
  RecommendationTitle: 'Рекомендуем'
};

/** Class work with resource and titles */
export class Resources {

  /**
   * Return accessed resource
   * @param name - name of resource
   */
  static getResources(name) {
    return (resources[name]) ? (resources[name]) : '$' + name + '$';
  }
}
