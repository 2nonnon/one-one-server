interface IAttribute {
  id: number;
  name: string;
  parentId: number;
}

export interface CreateSkuDto {
  name: string;
  img_url: string;
  market_price: number;
  price: number;
  stock: number;
  attributes: IAttribute[];
}
