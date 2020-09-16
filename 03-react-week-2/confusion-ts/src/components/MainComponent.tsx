import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import { Dish } from '../interfaces/dish.interface';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';


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

    const HomePage = () => (<Home />);

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu"
            component={
              () => (<Menu dishes={dishes} onClick={(dishId: number) => this.onDishSelect(dishId)} />)
            } />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
