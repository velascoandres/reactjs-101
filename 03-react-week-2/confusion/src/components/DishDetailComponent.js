import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    buildDate(date) {
        return new Intl
            .DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
            .format(
                new Date(Date.parse(date))
            );
    }

    renderComments(comments) {
        const hasComments = comments !== null;
        if (hasComments) {
            return comments.map(
                (comment) => {
                    return (
                        <li key={comment.id} className="list-unstyled">
                            <p>
                                {comment.content}
                            </p>
                            <p>
                                -- {comment.author}, {this.buildDate(comment.date)}
                            </p>
                        </li>
                    );
                }
            );
        } else {
            return (<div></div>);
        }
    }

    render() {
        const dish = this.props.dish;

        if (dish) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
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
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <ul>
                                {this.renderComments(dish.comments)}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div></div>)
        }

    }
}

export default DishDetail;