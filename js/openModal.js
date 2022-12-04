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
} from './elements.js';
import { getData } from './getData.js';

export const openModal = async (id) => {
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

  const countMinus = modalProduct.querySelector('.count__minus');
  const countAmount = modalProduct.querySelector('.count__amount');
  const countPlus = modalProduct.querySelector('.count__plus');
  countAmount.textContent = '1';
  
  countMinus.addEventListener('click', () => {
    if (countAmount.textContent === '1') return;
    countAmount.textContent = +countAmount.textContent - 1;
  });

  countPlus.addEventListener('click', () => {
    countAmount.textContent = +countAmount.textContent + 1;
  });
};
