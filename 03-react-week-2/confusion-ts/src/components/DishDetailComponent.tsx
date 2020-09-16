import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Dish, IComment } from '../interfaces/dish.interface';
import { Link } from 'react-router-dom';


interface IRenderDish {
  dish: Dish;
}

const RenderDish = ({ dish }: IRenderDish) => {
  return (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
};

interface IDishDetail {
  dish: Dish;
  comments: IComment[];
}

const DishDetail = ({ dish, comments }: IDishDetail): JSX.Element => {
  if (dish) {
    return (
      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home"> Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/menu"> Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {dish.name}
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="row">
          <div className="col-12">
            <h3>Menu</h3>
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <RenderComments comments={comments} />
          </div>
        </div>
      </div>
    );
  }
  return <div />;
};

function buildDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(Date.parse(date)));
}

interface IRenderComments {
  comments: IComment[];
}

const RenderComments = ({ comments }: IRenderComments): JSX.Element => {
  const hasComments = comments !== null && comments instanceof Array;
  if (hasComments) {
    return (
      <ul>
        {(comments as IComment[]).map((comment: IComment) => (
          <li key={comment.id} className="list-unstyled">
            <p>{comment.content}</p>
            <p>
              -- {comment.author}, {buildDate(comment.date)}
            </p>
          </li>
        ))}
      </ul>
    );
  }
  return <div />;
};

export default DishDetail;
