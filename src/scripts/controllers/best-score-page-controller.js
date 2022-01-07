import { BestScorePageComponent } from '../components/best-score-page-component';
import { removeComponent, renderComponent } from '../utils/component';

export class BestScorePageController {
  constructor(container, model) {
    this._container = container;
    this._model = model;
  }

  init() {
    this._bestScorePageComponent = new BestScorePageComponent(this._model.getPlayers());

    renderComponent(this._container, this._bestScorePageComponent);
  }

  destroy() {
    removeComponent(this._bestScorePageComponent);
  }
}
