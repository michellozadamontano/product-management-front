export interface ICategory {
  id: number;
  name: string;
  description: string;
  parentId?: number | null;
  children?: ICategory[];
}
export interface ITableCategory {
    id: number;
    name: string;
    description: string;
}
