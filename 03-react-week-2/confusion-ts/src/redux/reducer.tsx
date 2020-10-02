import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { COMMENTS } from '../shared/comments';
import { Dish, ILeader, IPromotion, IComment } from '../interfaces/dish.interface';


export interface IMainState {
    dishes: Dish[];
    selectedDish: number | string | null;
    leaders: ILeader[];
    promotions: IPromotion[];
    comments: IComment[];
}

export const initialState: IMainState = {
    dishes: DISHES,
    selectedDish: null,
    leaders: LEADERS,
    promotions: PROMOTIONS,
    comments: COMMENTS,
};


export const Reducer = (state: IMainState = initialState, action: any) => {
    return state;
}
