import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { Dish } from '../interfaces/dish.interface';


interface IRenderMenuProps {
  dish: Dish,
  onClick: (id: number) => void;
}

function RenderMenuItem({ dish, onClick, ...props }: IRenderMenuProps) {
  return (
    <Card
      key={dish.id}
      onClick={() => onClick(dish.id)} >
      <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
      <CardImgOverlay>
        <CardTitle> {dish.name} </CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

interface IMenuProps {
  dishes: Dish[],
  onClick: (id: number) => void;
}

const Menu = ({ dishes, onClick }: IMenuProps) => {
  const menu = dishes.map(
    (dish) => {
      return (
        <div className="col-12 col-md-5 m-1">
          <RenderMenuItem dish={dish} onClick={onClick} />
        </div>

      );
    },
  );

  return (
    <div className="container">
      <div className="row">
        {menu}
      </div>
    </div>
  );
};

export default Menu;
