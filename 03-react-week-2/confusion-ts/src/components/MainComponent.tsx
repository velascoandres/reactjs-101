import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import { Dish, ILeader, IPromotion } from '../interfaces/dish.interface';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';


interface IMainState {
  dishes: Dish[];
  selectedDish: number | string | null;
  leaders: ILeader[];
  promotions: IPromotion[];
}

class Main extends Component<{}, IMainState> {
  constructor(props: Object) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
      leaders: LEADERS,
      promotions: PROMOTIONS,
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

  get featuredDish(): Dish {
    return this.state.dishes.filter(
      (dish: Dish) => dish.featured,
    )[0];
  }

  get promotionFeatured(): IPromotion {
    return this.state.promotions.filter(
      (promotion: IPromotion) => promotion.featured,
    )[0];
  }

  get leaderFeatured(): ILeader {
    return this.state.leaders.filter(
      (leader: ILeader) => leader.featured,
    )[0];
  }

  render(): JSX.Element {
    const { dishes } = this.state;

    const HomePage = () => (
      <Home
        dish={this.featuredDish}
        promotion={this.promotionFeatured}
        leader={this.leaderFeatured}
      />
    );

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu"
            component={
              () => (<Menu dishes={dishes} onClick={(dishId: number) => this.onDishSelect(dishId)} />)
            } />
          <Route exact path="/contactus" component={() => <Contact />} />
          <Route path="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
