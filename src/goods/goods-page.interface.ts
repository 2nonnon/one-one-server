interface IGood {
  id?: string;
  cover_url: string;
  market_price: number;
  price: number;
  name: string;
  tag: number;
  total_stock: number;
  sold?: number;
  sale_time?: string;
}

export interface GoodsPage {
  total: number;
  goods: IGood[];
}
