import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }


    renderComments(comments) {
        const hasComments = comments !== null;
        if (hasComments) {
            return comments.map(
                (comment) => {
                    return (
                        <div key={comment.id} className="">
                            <p>
                                {comment.content}
                            </p>
                            <p>
                                -- {comment.author}, {comment.date}
                            </p>
                        </div>
                    );
                }
            );
        } else {
            return (<div></div>);
        }
    }

    render() {
        const dish = this.props.dish;

        return (
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
                    {this.renderComments(dish.comments)}
                </div>
            </div>
        );
    }
}

export default DishDetail;