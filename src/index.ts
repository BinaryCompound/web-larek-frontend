import './scss/styles.scss';
import { ensureElement } from './utils/utils';
import { EventEmitter, IEvents } from './components/base/events';
import { Api } from './components/base/api';
import { IAppApi } from './types/index';
import { API_URL, settings } from './utils/constants';
import { ProductItem } from './components/model/productData';



const containerPage = ensureElement<HTMLElement>('.page');
const containerModal = ensureElement<HTMLDivElement>('#modal-container');
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateBasket = ensureElement<HTMLTemplateElement>('#basket');
const templateOrder = ensureElement<HTMLTemplateElement>('#order');
const templateContacts = ensureElement<HTMLTemplateElement>('#contacts');
const templateSuccess = ensureElement<HTMLTemplateElement>('#success');

const productSample = [{
id: '123456',
description: 'bababoy4',
image: 'https://baldezh.top/uploads/posts/2023-12/1703081965_baldezh-top-p-priroda-islandii-krasivo-14.jpg',
title: 'bababoy2',
category: 'bababoy',
price: 100
}]

const events = new EventEmitter();
const product = new ProductItem(events);
const productCheck  = product.products = productSample;
console.log(productCheck);