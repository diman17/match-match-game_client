import { AboutGamePageController } from '../controllers/about-game-page-controller';
import { BestScorePageController } from '../controllers/best-score-page-controller';
import { GameSettingsPageController } from '../controllers/game-settings-page-controller';

export class Router {
  constructor(rootContainer) {
    this._rootConstainer = rootContainer;

    this.routes = {
      ABOUT_GAME_PAGE: {
        hash: '#about-game',
        controller: new AboutGamePageController(this._rootConstainer),
      },
      BEST_SCORE_PAGE: {
        hash: '#best-score',
        controller: new BestScorePageController(this._rootConstainer),
      },
      GAME_SETTINGS_PAGE: {
        hash: '#game-settings',
        controller: new GameSettingsPageController(this._rootConstainer),
      },
    };

    this.pageLinkElements = [];

    this._currentRoute = null;

    this._handleHashChange = this._handleHashChange.bind(this);
  }

  init() {
    this._renderRoute();
    this._hashChangeHandler(this._handleHashChange);
  }

  _renderRoute() {
    if (this._currentRoute) {
      this._currentRoute.destroy();
    }

    const {hash} = window.location;
    this._defineActivePageLink(hash, this.pageLinkElements);

    const controller = this._findControllerByHash(hash, this.routes);
    this._currentRoute = controller;
    this._currentRoute.init();
  }

  _findControllerByHash(hash, routesList) {
    if (!hash) {
      return routesList.ABOUT_GAME_PAGE.controller;
    }

    return Object.values(routesList).find((route) => route.hash === hash).controller;
  }

  _defineActivePageLink(hash, pagelinks) {
    pagelinks.forEach((pageLink) => {
      pageLink.classList.remove('page-navigation__link--active');

      if (!hash) {
        pagelinks.forEach((link) => {
          if (link.getAttribute('href') === this.routes.ABOUT_GAME_PAGE.hash) {
            link.classList.add('page-navigation__link--active');
          }
        });
      }

      if (hash === pageLink.getAttribute('href')) {
        pageLink.classList.add('page-navigation__link--active');
      }
    });
  }

  _handleHashChange() {
    this._renderRoute();

    const {hash} = window.location;
    this._defineActivePageLink(hash, this.pageLinkElements);
  }

  _hashChangeHandler(handler) {
    window.addEventListener('hashchange', handler);
  }
}
