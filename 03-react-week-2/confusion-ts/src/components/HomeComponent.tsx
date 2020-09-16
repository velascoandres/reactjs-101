import React from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody, CardSubtitle } from 'reactstrap';
import { Dish, ILeader, IPromotion } from '../interfaces/dish.interface';


interface IRenderCardProps {
    item: any;
}

const RenderCard = ({ item }: IRenderCardProps) => (
    <Card>
        <CardImg src={item.image as string} />
        <CardBody>
            <CardTitle>
                {item.name}
            </CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
            <CardText>{item.description}</CardText>
        </CardBody>
    </Card>
);

interface IHomeProps {
    dish: Dish;
    promotion: IPromotion;
    leader: ILeader;
}

const Home = ({ dish, promotion, leader }: IHomeProps): JSX.Element => {
    return (
        <div className="container">
            <div className="row alig-align-items-start">
                <div className="col-1 col-md m-1">
                    <RenderCard item={dish} />
                </div>

                <div className="col-1 col-md m-1">
                    <RenderCard item={promotion} />
                </div>

                <div className="col-1 col-md m-1">
                    <RenderCard item={leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;