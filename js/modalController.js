import { addCart } from './cart.js';
import { API_URL, PREFIX_PRODUCT } from './const.js';
import {
  ingredientsList,
  modalProductTitle,
  modalProductImage,
  modalProductDescription,
  ingredientsCalories,
  modalProductPriceCount,
  modalProduct,
  modalProductBtn,
  catalogList,
  countAmount,
} from './elements.js';
import { getData } from './getData.js';

const openModal = async (id) => {
  const product = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`);
  modalProductTitle.textContent = product.title;
  modalProductImage.src = `${API_URL}/${product.image}`;

  ingredientsList.textContent = '';

  const ingredientsListItems = product.ingredients.map((item) => {
    const li = document.createElement('li');
    li.classList.add('ingredients__item');
    li.textContent = item;
    return li;
  });

  ingredientsList.append(...ingredientsListItems);

  modalProductDescription.textContent = product.description;
  ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
  modalProductPriceCount.textContent = product.price;
  modalProductBtn.dataset.idProduct = product.id;

  modalProduct.classList.add('modal_open');
};

export const modalController = () => {
  const countMinus = modalProduct.querySelector('.count__minus');
  const countPlus = modalProduct.querySelector('.count__plus');
  
  countMinus.addEventListener('click', () => {
    if (countAmount.textContent === '1') return;
    countAmount.textContent = +countAmount.textContent - 1;
  });
  
  countPlus.addEventListener('click', () => {
    countAmount.textContent = +countAmount.textContent + 1;
  });

  catalogList.addEventListener('click', (event) => {
    const target = event.target;
  
    if (target.closest('.product__detail') || target.closest('.product__image')) {
      const id = target.closest('.product').dataset.idProduct;
      openModal(id);
      countAmount.textContent = '1';
    }
  });
  
  modalProduct.addEventListener('click', (event) => {
    const target = event.target;
  
    if (target.closest('.modal__close') || target === modalProduct) {
      modalProduct.classList.remove('modal_open');
    }
  });

  modalProductBtn.addEventListener('click', () => {
    addCart(
      modalProductBtn.dataset.idProduct,
      parseInt(countAmount.textContent),
    )
    countAmount.textContent = '1';
  });
}

