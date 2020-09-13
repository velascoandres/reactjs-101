export interface Dish {
    id: number;
    name: string;
    category: string;
    label: string;
    price: string;
    description: string;
    image: string;
    comments?: {
        id: number;
        author: string;
        date: string;
        content: string;
    }[] | null;
}
