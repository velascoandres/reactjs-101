import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from './../shared/dishes';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';


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
                <Menu dishes={this.state.dishes}
                    onClick={(dishId) => this.onDishSelect(dishId)}
                />
                <DishDetail
                    dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} >
                </DishDetail>
            </div>
        );
    }
}

export default Main;
