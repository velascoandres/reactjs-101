import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from './../shared/dishes';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { Dish } from '../interfaces/dish.interface';


export class Main extends Component {

  state: { dishes: Dish[], selectedDish?: number | null };

  constructor(props: any) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  onDishSelect(dishId: number | string) {
    this.setState(
      {
        selectedDish: dishId,
      },
    );
  }

  get selectedDish(): Dish {
    return this.state.dishes.filter((dish: Dish) => dish.id === this.state.selectedDish)[0]
  }

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">
              Ristorante Confusion
            </NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes}
          onClick={(dishId: number) => this.onDishSelect(dishId)}
        />
        <DishDetail
          dish={this.selectedDish as Dish}
        />
      </div>
    );
  }
}

export default Main;
