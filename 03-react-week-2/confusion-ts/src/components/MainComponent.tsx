import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import { Dish, IComment, ILeader, IPromotion } from '../interfaces/dish.interface';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import DishDetail from './DishDetailComponent';
import { COMMENTS } from '../shared/comments';
import About from './AboutComponent';


interface IMainState {
  dishes: Dish[];
  selectedDish: number | string | null;
  leaders: ILeader[];
  promotions: IPromotion[];
  comments: IComment[];
}

class Main extends Component<{}, IMainState> {
  constructor(props: Object) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
      leaders: LEADERS,
      promotions: PROMOTIONS,
      comments: COMMENTS,
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


  getDishById(id: string): Dish {
    return this.state.dishes.filter(dish => dish.id === parseInt(id, 10))[0];
  }

  getCommendsByDishId(dishId: string): IComment[] {
    return this.state.comments.filter(comment => comment.dishId === parseInt(dishId, 10));
  }


  render(): JSX.Element {
    const { dishes, leaders } = this.state;

    const HomePage = () => (
      <Home
        dish={this.featuredDish}
        promotion={this.promotionFeatured}
        leader={this.leaderFeatured}
      />
    );

    const DishWithId = ({ match }: any) => (
      <DishDetail
        dish={this.getDishById(match.params.dishId)}
        comments={this.getCommendsByDishId(match.params.dishId)}
      />
    )

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => (<Menu dishes={dishes} />)} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={() => <Contact />} />
          <Route exact path="/aboutus" component={() => <About leaders={leaders} />} />
          <Route path="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
