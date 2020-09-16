import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Dish } from '../interfaces/dish.interface';
import { Link } from 'react-router-dom';


interface IRenderMenuProps {
  dish: Dish;
}

function RenderMenuItem({
  dish,
  ...props
}: IRenderMenuProps): JSX.Element {
  return (
    <Card key={dish.id}>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

interface IMenuProps {
  dishes: Dish[];
  onClick?: (id: number) => void;
}

const Menu = ({ dishes }: IMenuProps): JSX.Element => {
  const menu = dishes.map((dish) => (
    <div className="col-12 col-md-5 m-1" key={dish.id}>
      <RenderMenuItem dish={dish} />
    </div>
  ));

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home"> Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            Menu
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
        </div>
      </div>
      <div className="row">{menu}</div>
    </div>
  );
};

export default Menu;
