import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Dish } from '../interfaces/dish.interface';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Menu extends Component {
    state: any;
    constructor(
        public props: { dishes: Dish[] }
    ) {
        super(props);
        this.state = {
            selectedDish: null,
        };
        console.log('Menu component constr');
    }

    componentDidMount() {
        console.log('Component Did mount');
    }

    onDishSelect(dish: Dish) {
        this.setState(
            {
                selectedDish: dish,
            }
        );
    }


    renderDish(dish: Dish) {
        if (dish !== null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return (<div></div>)
        }
    }

    render() {
        console.log('rendering..');
        const menu = this.props.dishes.map(
            (dish: Dish) => {
                return (
                    <div key={dish.id} className="col-12 col-md-5 m-1">
                        <Card onClick={() => this.onDishSelect(dish)} >
                            <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                            <CardImgOverlay>
                                <CardTitle> {dish.name} </CardTitle>
                            </CardImgOverlay>
                        </Card>
                    </div>

                );
            }
        );

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    {this.renderDish(this.state.selectedDish)}
                </div>
            </div>
        );
    }
}

export default Menu;