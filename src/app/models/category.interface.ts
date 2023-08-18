export interface ICategory {
  id: number;
  name: string;
  description: string;
  parentId?: number | null;
  children?: ICategory[];
}
