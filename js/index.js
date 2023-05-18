import { wireless, headphones } from "./const.js";

const selectedAssets = [];

// Получаю массив выбранных товаров и отрисовываю их колличество на иконке корзины

export const getQuantityAssets = (selectedAssets) => {
    const basketNumber = document.querySelector('.product-basket__number');
    if (selectedAssets.length) {
        basketNumber.classList.remove('product-basket__number--hide');
        basketNumber.textContent = selectedAssets.length;
    };
};

// Получаю шаблон из верстки и отрисовываю список товаров

const templateCard = document.querySelector('#card')
    .content
    .querySelector('.assets__item');



const assetsHeadphones = document.querySelector('#headphones');
const assetsWireless = document.querySelector('#wireless');

const getHeadphonesList = (data, item) => {

    data.forEach(({ img, title, price, sale, rate, id, quantity }) => {
        const copyCardTemplate = templateCard.cloneNode(true);
        const buyButton = copyCardTemplate.querySelector('.assets__link');
        copyCardTemplate.querySelector('.assets__image').src = img;
        copyCardTemplate.querySelector('.assets__title').textContent = title;
        copyCardTemplate.querySelector('.assets__price-number').textContent = price;
        copyCardTemplate.querySelector('.assets__rating-number').textContent = rate;

        buyButton.addEventListener('click', () => {
            if (!selectedAssets.find(item => item.id == id)) {
                selectedAssets.push({ img, title, price, id, quantity });
            };
            getQuantityAssets(selectedAssets);
            const assetsList = JSON.stringify(selectedAssets);
            window.sessionStorage.setItem('assetsList', assetsList);
        });

        sale !== 0
            ? copyCardTemplate.querySelector('.assets__sale-number').textContent = sale
            : copyCardTemplate.querySelector('.assets__sale').textContent = '';

        if (item) {
            item.appendChild(copyCardTemplate);
        };
    });
};


getHeadphonesList(headphones, assetsHeadphones);
getHeadphonesList(wireless, assetsWireless);
