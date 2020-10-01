import React, { Component } from 'react';
import Menu from './MenuComponent';
import { Dish, IComment, ILeader, IPromotion } from '../interfaces/dish.interface';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { IMainState } from '../redux/reducer';


type MainProps = IMainState & RouteComponentProps<any>;

const mapStateToProps = (state: IMainState): Pick<MainProps, keyof IMainState> => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
    selectedDish: state.selectedDish,
  };
}



class Main extends Component<MainProps, IMainState> {
  constructor(props: MainProps) {
    super(props);
  }

  onDishSelect(dishId: number | string): void {
    this.setState({
      selectedDish: dishId,
    });
  }

  get selectedDish(): Dish {
    const { dishes, selectedDish } = this.props;
    return dishes.filter((dish: Dish) => dish.id === selectedDish)[0];
  }

  get featuredDish(): Dish {
    return this.props.dishes.filter(
      (dish: Dish) => dish.featured,
    )[0];
  }

  get promotionFeatured(): IPromotion {
    return this.props.promotions.filter(
      (promotion: IPromotion) => promotion.featured,
    )[0];
  }

  get leaderFeatured(): ILeader {
    return this.props.leaders.filter(
      (leader: ILeader) => leader.featured,
    )[0];
  }


  getDishById(id: string): Dish {
    return this.props.dishes.filter(dish => dish.id === parseInt(id, 10))[0];
  }

  getCommendsByDishId(dishId: string): IComment[] {
    return this.props.comments.filter(comment => comment.dishId === parseInt(dishId, 10));
  }


  render(): JSX.Element {
    const { dishes, leaders } = this.props;

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

export default withRouter(connect(mapStateToProps)(Main));
