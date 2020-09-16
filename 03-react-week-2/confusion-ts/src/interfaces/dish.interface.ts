export interface ILeader {
  id: number;
  name: string;
  image: string;
  designation: string;
  featured: boolean;
  description: string;
  abbr: string;
}

export interface IPromotion {
  id: number;
  name: string;
  image: string;
  label: string;
  price: string;
  featured: boolean;
  description: string;
}

export interface IComment {
  id: number;
  author: string;
  date: string;
  content: string;
  dishId: number;
  rating: number;
}

export interface Dish {
  id: number;
  name: string;
  category: string;
  label: string;
  price: string;
  description: string;
  image: string;
  comments?: IComment[] | null;
  featured: boolean;
}
