import { modalController } from './modalController.js';
import { renderListProduct } from './renderListProduct.js';
import { navigationListController } from './navigationListController.js';
import { cartInit } from './cart.js';



const init = () => {
  renderListProduct();
  navigationListController(renderListProduct);
  cartInit();
  modalController();
};

init();
