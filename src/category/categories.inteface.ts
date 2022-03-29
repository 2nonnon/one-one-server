export interface Categories {
  id: number;
  name: string;
  parentId: number;
  children?: Categories[];
}
