export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    quantity: number;
}
export interface IProductResponse {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    result: IProduct[];
}
