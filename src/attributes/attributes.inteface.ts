export interface Attributes {
  id: number;
  name: string;
  parentId: number;
  children?: Attributes[];
}
