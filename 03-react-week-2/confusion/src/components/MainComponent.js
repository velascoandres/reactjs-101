import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from './../shared/dishes';
import RenderMenu from './MenuComponent';
import RenderDishDetail from './DishDetailComponent';


export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null,
        };
    }

    onDishSelect(dishId) {
        this.setState(
            {
                selectedDish: dishId,
            }
        );
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
                <RenderMenu dishes={this.state.dishes}
                    onClick={(dishId) => this.onDishSelect(dishId)}
                />
                <RenderDishDetail
                    dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} >
                </RenderDishDetail>
            </div>
        );
    }
}

export default Main;
