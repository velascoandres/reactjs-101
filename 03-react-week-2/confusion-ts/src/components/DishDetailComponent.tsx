import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader, Col, FormGroup, Label, Row
} from 'reactstrap';
import { Dish, IComment } from '../interfaces/dish.interface';
import { Link } from 'react-router-dom';
import { ValidatorFn, LocalForm, Control, Errors } from 'react-redux-form';




const required: ValidatorFn = (val: string): boolean => !!(val && val.length);
const maxLenght: (len: number) => ValidatorFn = (len: number) => (val: string): boolean => typeof val === 'string' && val.length <= len;
const minLenght: (len: number) => ValidatorFn = (len: number) => (val: string): boolean => typeof val === 'string' && val.length >= len;

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

interface IDishDetailState {
  isModalOpen: boolean;
}

interface IDishDetailProps {
  dish: Dish;
  comments: IComment[];
}




class DishDetail extends Component<IDishDetailProps, IDishDetailState>{

  toogleModal() {
    this.setState(
      {
        isModalOpen: !this.state.isModalOpen,
      }
    );
  }

  constructor(props: IDishDetailProps) {
    super(props);
    this.state = {
      isModalOpen: false,
    }
    this.toogleModal = this.toogleModal.bind(this);
  }

  render() {
    const { dish, comments } = this.props;
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
              <RenderComments comments={comments} toogleModal={this.toogleModal} />
            </div>
          </div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toogleModal}>
            <ModalHeader toggle={this.toogleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <CommentForm />
            </ModalBody>
          </Modal>
        </div>
      );
    }
    return <div />;
  }
}

function buildDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(Date.parse(date)));
}

interface IRenderComments {
  comments: IComment[];
  toogleModal: () => void
}

const RenderComments = ({ comments, toogleModal }: IRenderComments): JSX.Element => {
  const hasComments = comments !== null && comments instanceof Array;
  if (hasComments) {
    return (
      <React.Fragment>
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
        <Button outline onClick={toogleModal}>
          <span className="fa fa-edit fa-lg"></span> Submit Comment
              </Button>
      </React.Fragment>
    );
  }
  return <div />;
};

class CommentForm extends Component<any, any> {

  handleSubmit(event: any) {
    alert(JSON.stringify(event));
  }

  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

        <Row className="form-group">
          <Label htmlFor="rating" md={12}>Rating</Label>
          <Col md={12}>
            <Control.select
              model=".rating"
              name="rating"
              className="form-control"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Control.select>
          </Col>
        </Row>

        <Row className="form-group">
          <Label htmlFor="username" md={12}>Your Name</Label>
          <Col md={12}>
            <Control.text
              model=".username"
              className="form-control"
              id="username"
              name="username"
              placeholder="Your Name"
              validators={
                {
                  required,
                  maxLenght: maxLenght(15),
                  minLenght: minLenght(3)
                }
              }
            />
            <Errors
              className="text-danger"
              model=".username"
              show="touched"
              messages={{
                required: 'Required ',
                maxLenght: 'Must be 15 characters or less',
                minLenght: 'Must be greater than 2 characters'
              }}
            />
          </Col>
        </Row>

        <Row className="form-group">
          <Label htmlFor="comment" md={12}>Comment</Label>
          <Col md={12}>
            <Control.textarea
              model=".comment"
              id="comment"
              name="comment"
              className="form-control"
              rows={6}
            />
          </Col>
        </Row>

        <FormGroup row>
          <Col md={{ size: 10 }}>
            <Button type="submit" color="primary">
              Submit
           </Button>
          </Col>
        </FormGroup>

      </LocalForm>
    );
  }
}

export default DishDetail;
