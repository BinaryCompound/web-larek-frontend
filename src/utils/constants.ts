
import { TCategoryClasses } from '../types/index';
export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const categories: TCategoryClasses = {
  'софт-скил': 'card__category_soft',
  'дополнительное': 'card__category_additional',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'другое': 'card__category_other'
  }