import './scss/styles.scss';
import { ensureElement } from './utils/utils'
import { EventEmitter, IEvents } from './components/base/events'
import { Api } from './components/base/api'
import { IAppApi } from './types/index'
import { API_URL, settings } from './utils/constants'


//Находим HTML элементы
const containerPage = ensureElement<HTMLElement>('.page');
const containerModal = ensureElement<HTMLDivElement>('#modal-container');
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateBasket = ensureElement<HTMLTemplateElement>('#basket');
const templateOrder = ensureElement<HTMLTemplateElement>('#order');
const templateContacts = ensureElement<HTMLTemplateElement>('#contacts');
const templateSuccess = ensureElement<HTMLTemplateElement>('#success');

