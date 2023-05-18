import { getQuantityAssets } from "./index.js";

const sessionStorage = window.sessionStorage.getItem('assetsList');

const basket = document.querySelector('.basket');

if (basket) {
    const selectedBasketAssets = JSON.parse(sessionStorage);
    const templateBasketCard = document.querySelector('#basket-card')
        .content
        .querySelector('.basket-card__item');

    const assetsBasket = document.querySelector('#basket');

    getQuantityAssets(selectedBasketAssets);
    getBasketLists(selectedBasketAssets, assetsBasket);

    const buttonDecrement = basket.querySelectorAll('.basket-card__button-decrement');
    const buttonIncrement = basket.querySelectorAll('.basket-card__button-increment');
    let total = basket.querySelector('.basket__all-sum-numbers');
    const allSum = basket.querySelectorAll('.basket-card__sum');


    for (let i = 0; i < buttonIncrement.length; i++) {
        buttonIncrement[i].addEventListener('click', () => {
            const parent = buttonDecrement[i].closest('.basket-card__item');
            const quantity = parent.querySelector('.basket-card__quantity').textContent;
            parent.querySelector('.basket-card__quantity').textContent = Number(quantity) + 1;
            const price = parent.querySelector('.basket-card__price-number').textContent;
            let sumItem = parent.querySelector('.basket-card__sum').textContent;
            sumItem = parent.querySelector('.basket-card__sum').textContent = (Number(sumItem.replace(/\D/g,'')) + Number(price.replace(/\D/g,''))).toLocaleString('ru-RU');
            let totalNumber = total.textContent.toLocaleString('ru-RU');
            totalNumber = total.textContent = (Number(totalNumber.replace(/\D/g,'')) + Number(price.replace(/\D/g,''))).toLocaleString('ru-RU');
        });
    };

    for (let i = 0; i < buttonDecrement.length; i++) {
        buttonDecrement[i].addEventListener('click', () => {
            const parent = buttonDecrement[i].closest('.basket-card__item');
            const quantity = parent.querySelector('.basket-card__quantity').textContent;

            if (quantity > 1) {
                parent.querySelector('.basket-card__quantity').textContent = Number(quantity) - 1;
            };
            const price = parent.querySelector('.basket-card__price-number').textContent;
            let sumItem = parent.querySelector('.basket-card__sum').textContent;
            if (quantity > 1) {
                sumItem = parent.querySelector('.basket-card__sum').textContent = (Number(sumItem.replace(/\D/g,'')) - Number(price.replace(/\D/g,''))).toLocaleString('ru-RU');
            };
            let totalNumber = total.textContent.toLocaleString('ru-RU');
            if (quantity > 1) {
                totalNumber = total.textContent = (Number(totalNumber.replace(/\D/g,'')) - Number(price.replace(/\D/g,''))).toLocaleString('ru-RU');
            };
        });
    };



    for (let i = 0; i < allSum.length; i++) {
        total.textContent = (Number(total.textContent.replace(/\D/g,'')) + Number((allSum[i].textContent).replace(/\D/g,''))).toLocaleString('ru-RU');
        // total.textContent.toLocaleString('ru-RU');
        // console.log('total.textContent', total.textContent)
    };

    function getBasketLists(data, item) {

        data.forEach(({ img, title, price, quantity }) => {
            const copyBasketCardTemplate = templateBasketCard.cloneNode(true);
            copyBasketCardTemplate.querySelector('.basket-card__image').src = img;
            copyBasketCardTemplate.querySelector('.basket-card__title').textContent = title;
            copyBasketCardTemplate.querySelector('.basket-card__price-number').textContent = price.toLocaleString('ru-RU');
            copyBasketCardTemplate.querySelector('.basket-card__quantity').textContent = quantity;
            copyBasketCardTemplate.querySelector('.basket-card__sum').textContent = price.toLocaleString('ru-RU');

            if (item) {
                item.appendChild(copyBasketCardTemplate);
            };
        });
    };

};



