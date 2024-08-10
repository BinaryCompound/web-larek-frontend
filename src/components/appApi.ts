import { Api, ApiListResponse } from "./base/api";
import { IAppApi, IProductItem, IOrder, TOrderSuccess } from "../types"

export class AppApi extends Api implements IAppApi {
  protected cdn: string;

  constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
    super(baseUrl, options);
    this.cdn = cdn;
  }
  getProducts(): Promise<IProductItem[]> {
    throw new Error("Method not implemented.");
  }

  getCards(): Promise<IProductItem[]> {
    return this.get('/product').then((list: ApiListResponse<IProductItem>) => {
      return list.items.map((item) => { return { ...item, image: this.cdn + item.image } })
    })
  }

  getCardById(id: string): Promise<IProductItem> {
    return this.get('/product/' + id).then((card: IProductItem) => {
      return { ...card, image: this.cdn + card.image }
    })
  }

  postOrder(order: IOrder): Promise<TOrderSuccess> {
    return this.post('/order', order).then((success: TOrderSuccess) => success)

  }

}


