import { Api, ApiListResponse } from "./base/api";
import { IAppApi, IProductItem, IOrder, TSuccessData } from "../types"

export class AppApi extends Api implements IAppApi {
  protected cdn: string; 

  constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  async getProducts(): Promise<IProductItem[]> {
    return this.get<ApiListResponse<IProductItem>>('/product').then((list) => {
      return list.items.map((item) => {
        return { ...item, image: this.cdn + item.image };
      });
    });
  }

  async postOrder(order: IOrder): Promise<TSuccessData> {
    return this.post<TSuccessData>('/order', order).then((success) => {
      return success
    })
  }

}  


