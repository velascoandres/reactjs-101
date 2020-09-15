import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';
import { Dish } from '../interfaces/dish.interface';


const RenderDish = ({ dish }: { dish: Dish }) => {
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
};

interface IDishDetail {
    dish: Dish;
};

const DishDetail = ({ dish }: IDishDetail) => {
    if (dish) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul>
                            <RenderComments comments={dish.comments} />
                        </ul>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div></div>);
    }
};


function buildDate(date: string) {
    return new Intl
        .DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
        .format(
            new Date(Date.parse(date)),
        );
}


const RenderComments = ({ comments }: any) => {
    const hasComments = comments !== null;
    if (hasComments) {
        return comments.map(
            (comment: any) => {
                return (
                    <li key={comment.id} className="list-unstyled">
                        <p>
                            {comment.content}
                        </p>
                        <p>
                            -- {comment.author}, {buildDate(comment.date)}
                        </p>
                    </li>
                );
            },
        );
    } else {
        return (<div></div>);
    }
};

export default DishDetail;
