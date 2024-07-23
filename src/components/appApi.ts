import { Api, ApiListResponse } from "./base/api";
import { IAppApi, IProductItem, IOrder, TSuccessData } from "../types"

export class AppApi extends Api implements IAppApi {
  protected cdn: string; 

  constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProducts(): Promise<IProductItem[]> {
    return this.get('/product').then((list: ApiListResponse<IProductItem>) => {
      return list.items.map((item) => { return {...item, image: this.cdn + item.image}})
    })
  }

  postOrder(order: IOrder): Promise<TSuccessData> {
    return this.post('/order', order).then((success: TSuccessData) => {
      return success
    })
  }
}  