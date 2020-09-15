import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { Dish } from '../interfaces/dish.interface';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

interface IMainState {
  dishes: Dish[];
  selectedDish: number | string | null;
}

class Main extends Component<{}, IMainState> {
  constructor(props: Object) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  onDishSelect(dishId: number | string): void {
    this.setState({
      selectedDish: dishId,
    });
  }

  get selectedDish(): Dish {
    const { dishes, selectedDish } = this.state;
    return dishes.filter((dish: Dish) => dish.id === selectedDish)[0];
  }

  render(): JSX.Element {
    const { dishes } = this.state;
    return (
      <div className="App">
        <Header />
        <Menu
          dishes={dishes}
          onClick={(dishId: number) => this.onDishSelect(dishId)}
        />
        <DishDetail dish={this.selectedDish as Dish} />
        <Footer />
      </div>
    );
  }
}

export default Main;
